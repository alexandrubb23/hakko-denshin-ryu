import { useMe } from "@hooks/useMe";
import { useUploadMyImage } from "@hooks/useUploadMyImage";

import StudentCard from "./StudentCard";

type Props = {
  children?: React.ReactNode;
};

const StudentProfileCard = ({ children }: Props) => {
  const { data: user, isLoading, isError } = useMe();
  const uploadMutation = useUploadMyImage();

  return (
    <StudentCard
      user={user}
      isLoading={isLoading}
      isError={isError}
      uploadMutation={uploadMutation}
    >
      {children}
    </StudentCard>
  );
};

export default StudentProfileCard;
