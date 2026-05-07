import { useMe } from "@features/student/profile/hooks/useMe";
import { useUploadMyImage } from "@features/student/profile/hooks/useUploadMyImage";
import { useMyRanks } from "@features/student/ranks/hooks/useMyRanks";

import StudentCard from "./StudentCard";

type Props = {
  children?: React.ReactNode;
};

const StudentProfileCard = ({ children }: Props) => {
  const { data: user, isLoading, isError } = useMe();
  const uploadMutation = useUploadMyImage();
  const { data: ranks, isLoading: isRankLoading } = useMyRanks();

  const latestRank =
    ranks && ranks.length > 0
      ? ranks.reduce((best, curr) =>
          curr.rank.order > best.rank.order ? curr : best,
        )
      : undefined;

  return (
    <StudentCard
      user={user}
      isLoading={isLoading}
      isError={isError}
      uploadMutation={uploadMutation}
      latestRank={latestRank}
      isRankLoading={isRankLoading}
    >
      {children}
    </StudentCard>
  );
};

export default StudentProfileCard;
