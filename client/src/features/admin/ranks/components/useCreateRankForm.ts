import {
  createStudentRankSchema,
  type CreateStudentRankInput,
} from "@hakko/core";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateStudentRank } from "@features/admin/ranks/hooks/useCreateStudentRank";
import { useRanks } from "@hooks/useRanks";
import useTranslateError from "@hooks/useTranslateError";
import getServerError from "@utils/getServerError";

import useRankForm from "./useRankForm";

const CREATE_DEFAULTS: CreateStudentRankInput = {
  rankId: 0,
  awardedAt: "",
  notes: "",
};

const useCreateRankForm = (
  studentId: string,
  open: boolean,
  onClose: () => void,
) => {
  const mutation = useCreateStudentRank(studentId);
  const { data: ranks = [] } = useRanks();
  const translateError = useTranslateError();

  const { control, register, handleSubmit, errors } = useRankForm({
    resolver: zodResolver(createStudentRankSchema),
    getDefaultValues: () => CREATE_DEFAULTS,
    open,
    onReset: mutation.reset,
  });

  const onSubmit = (values: CreateStudentRankInput) => {
    mutation.mutate(
      { ...values, notes: values.notes || undefined },
      { onSuccess: () => onClose() },
    );
  };

  return {
    control,
    register,
    handleSubmit,
    onSubmit,
    errors,
    ranks,
    isPending: mutation.isPending,
    serverError: translateError(
      getServerError(mutation.error, mutation.isError),
    ),
  };
};

export default useCreateRankForm;
