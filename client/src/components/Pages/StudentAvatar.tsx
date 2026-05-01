import PersonIcon from "@mui/icons-material/Person";
import { Skeleton, Tooltip } from "@mui/material";
import { useState } from "react";

import AvatarUploadDialog from "@components/AvatarUploadDialog/AvatarUploadDialog";
import { useUploadStudentImage } from "@hooks/useUploadStudentImage";
import { SKELETON_SX } from "@style/tokens";
import { getInitials } from "@utils/string";
import { StyledAvatar } from "./StudentAvatar.style";

interface StudentAvatarProps {
  studentId: string;
  name?: string;
  imageUrl?: string | null;
  isLoading: boolean;
}

const StudentAvatar = ({
  studentId,
  name,
  imageUrl,
  isLoading,
}: StudentAvatarProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const uploadMutation = useUploadStudentImage(studentId);

  if (isLoading) {
    return (
      <Skeleton variant="circular" width={64} height={64} sx={SKELETON_SX} />
    );
  }

  return (
    <>
      <Tooltip title="Change profile photo" placement="right">
        <StyledAvatar
          data-testid="student-avatar"
          src={imageUrl ?? undefined}
          onClick={() => setDialogOpen(true)}
        >
          {name ? getInitials(name) : <PersonIcon />}
        </StyledAvatar>
      </Tooltip>

      <AvatarUploadDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        currentImageUrl={imageUrl}
        displayName={name}
        uploadMutation={uploadMutation}
      />
    </>
  );
};

export default StudentAvatar;
