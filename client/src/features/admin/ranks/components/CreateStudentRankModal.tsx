import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

import StudentRankDialog from "./StudentRankDialog";
import StudentRankFormFields from "./StudentRankFormFields";
import useCreateRankForm from "./useCreateRankForm";

interface Props {
  studentId: string;
  open: boolean;
  onClose: () => void;
}

const CreateStudentRankModal = ({ studentId, open, onClose }: Props) => {
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
          <EmojiEventsIcon fontSize="small" /> Assign Rank
        </>
      }
      onSubmit={handleSubmit(onSubmit)}
      isPending={isPending}
      submitLabel={isPending ? "Saving…" : "Assign Rank"}
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
