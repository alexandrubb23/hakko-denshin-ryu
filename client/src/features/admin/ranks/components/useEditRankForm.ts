import {
  updateStudentRankSchema,
  type UpdateStudentRankInput,
} from "@hakko/core";
import { zodResolver } from "@hookform/resolvers/zod";

import { type StudentRankEntry } from "@api/students";
import { useUpdateStudentRank } from "@features/admin/ranks/hooks/useUpdateStudentRank";
import { useRanks } from "@hooks/useRanks";
import getServerError from "@utils/getServerError";

import useRankForm from "./useRankForm";

const useEditRankForm = (
  studentId: string,
  entry: StudentRankEntry,
  open: boolean,
  onClose: () => void,
) => {
  const mutation = useUpdateStudentRank(studentId);
  const { data: ranks = [] } = useRanks();

  const getDefaultValues = () => ({
    awardedAt: entry.awardedAt.slice(0, 10),
    notes: entry.notes ?? "",
  });

  const { control, register, handleSubmit, errors, isDirty } = useRankForm({
    resolver: zodResolver(updateStudentRankSchema),
    getDefaultValues,
    open,
    extraResetDeps: [entry],
    onReset: mutation.reset,
  });

  const onSubmit = (values: UpdateStudentRankInput) => {
    if (!isDirty) {
      onClose();
      return;
    }
    mutation.mutate(
      {
        rankEntryId: entry.id,
        payload: { ...values, notes: values.notes || undefined },
      },
      { onSuccess: () => onClose() },
    );
  };

  return {
    control,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isDirty,
    ranks,
    isPending: mutation.isPending,
    serverError: getServerError(mutation.error, mutation.isError),
  };
};

export default useEditRankForm;
