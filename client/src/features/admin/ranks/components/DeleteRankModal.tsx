import { type StudentRankEntry } from "@api/students";
import getServerError from "@utils/getServerError";
import { useState } from "react";
import { useIntl } from "react-intl";

import { useDeleteStudentRank } from "@features/admin/ranks/hooks/useDeleteStudentRank";

import ConfirmDeleteModal from "@components/shared/ConfirmDeleteModal";
import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import useTranslateError from "@hooks/useTranslateError";

interface Props {
  studentId: string;
  entry: StudentRankEntry;
  open: boolean;
  onClose: () => void;
}

const DeleteRankModal = ({ studentId, entry, open, onClose }: Props) => {
  const intl = useIntl();
  const translateError = useTranslateError();
  const { mutate, isPending } = useDeleteStudentRank(studentId);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    if (isPending) return;
    setError(null);
    onClose();
  };

  const handleConfirm = () => {
    setError(null);
    mutate(entry.id, {
      onSuccess: handleClose,
      onError: (err) =>
        setError(
          translateError(getServerError(err)) ??
            intl.formatMessage({ id: "admin.ranks.delete.error" })
        ),
    });
  };

  return (
    <ConfirmDeleteModal
      open={open}
      title={intl.formatMessage({ id: "admin.ranks.delete.title" })}
      message={
        <FormattedMessage
          id="admin.ranks.delete.message"
          values={{
            name: (
              <strong key="name" style={{ color: "white" }}>
                {entry.rank.name}
              </strong>
            ),
            date: (
              <strong key="date" style={{ color: "white" }}>
                {new Date(entry.awardedAt).toLocaleDateString(intl.locale)}
              </strong>
            ),
          }}
        />
      }
      onClose={handleClose}
      onConfirm={handleConfirm}
      isPending={isPending}
      error={error}
    />
  );
};

export default DeleteRankModal;
