import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useIntl } from "react-intl";

import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";

import StudentRankDialog from "./StudentRankDialog";
import StudentRankFormFields from "./StudentRankFormFields";
import useCreateRankForm from "./useCreateRankForm";

interface Props {
  studentId: string;
  open: boolean;
  onClose: () => void;
}

const CreateStudentRankModal = ({ studentId, open, onClose }: Props) => {
  const intl = useIntl();
  const {
    control,
    register,
    handleSubmit,
    onSubmit,
    errors,
    ranks,
    isPending,
    serverError,
  } = useCreateRankForm(studentId, open, onClose);

  return (
    <StudentRankDialog
      open={open}
      onClose={onClose}
      title={
        <>
          <EmojiEventsIcon fontSize="small" />{" "}
          <FormattedMessage id="admin.ranks.assign" />
        </>
      }
      onSubmit={handleSubmit(onSubmit)}
      isPending={isPending}
      submitLabel={intl.formatMessage({
        id: isPending ? "admin.ranks.form.saving" : "admin.ranks.assign",
      })}
    >
      <StudentRankFormFields
        control={control}
        register={register}
        errors={errors}
        ranks={ranks}
        serverError={serverError}
      />
    </StudentRankDialog>
  );
};

export default CreateStudentRankModal;
