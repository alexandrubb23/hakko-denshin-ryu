import EditIcon from "@mui/icons-material/Edit";
import { useIntl } from "react-intl";

import { type StudentRankEntry } from "@api/students";
import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";

import StudentRankDialog from "./StudentRankDialog";
import StudentRankFormFields from "./StudentRankFormFields";
import useEditRankForm from "./useEditRankForm";

interface Props {
  studentId: string;
  entry: StudentRankEntry;
  open: boolean;
  onClose: () => void;
}

const EditStudentRankModal = ({ studentId, entry, open, onClose }: Props) => {
  const intl = useIntl();
  const {
    control,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isDirty,
    ranks,
    isPending,
    serverError,
  } = useEditRankForm(studentId, entry, open, onClose);

  return (
    <StudentRankDialog
      open={open}
      onClose={onClose}
      title={
        <>
          <EditIcon fontSize="small" />{" "}
          <FormattedMessage id="admin.ranks.edit.title" />
        </>
      }
      onSubmit={handleSubmit(onSubmit)}
      isPending={isPending}
      submitLabel={intl.formatMessage({
        id: isPending
          ? "admin.ranks.form.saving"
          : "admin.ranks.form.saveChanges",
      })}
      submitDisabled={!isDirty}
    >
      <StudentRankFormFields
        control={control}
        register={register}
        errors={errors}
        ranks={ranks}
        serverError={serverError}
        rankEditable={false}
        displayRankId={entry.rankId}
      />
    </StudentRankDialog>
  );
};

export default EditStudentRankModal;
