import { useMyRanks } from "@features/student/ranks/hooks/useMyRanks";

import ErrorAlert from "@components/shared/ErrorAlert";
import InfoAlert from "@components/shared/InfoAlert";
import RankTable from "@features/admin/ranks/components/RankTable";

const noop = () => {};

const MyRankTab = () => {
  const { data: ranks, isLoading, isError } = useMyRanks();

  return (
    <>
      {isError && (
        <ErrorAlert>Failed to load rank history. Please try again.</ErrorAlert>
      )}

      {!isLoading && !isError && ranks?.length === 0 && (
        <InfoAlert>No ranks assigned yet.</InfoAlert>
      )}

      {(isLoading || (ranks && ranks.length > 0)) && (
        <RankTable
          isLoading={isLoading}
          ranks={ranks}
          onEdit={noop}
          onDelete={noop}
          readOnly
        />
      )}
    </>
  );
};

export default MyRankTab;
