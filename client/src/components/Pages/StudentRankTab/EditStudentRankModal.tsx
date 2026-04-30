import EditIcon from "@mui/icons-material/Edit";

import { type StudentRankEntry } from "@api/students";

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
          <EditIcon fontSize="small" /> Edit Rank
        </>
      }
      onSubmit={handleSubmit(onSubmit)}
      isPending={isPending}
      submitLabel={isPending ? "Saving…" : "Save Changes"}
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
