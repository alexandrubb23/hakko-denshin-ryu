import { useMyRanks } from "@hooks/useMyRanks";

import ErrorAlert from "./shared/ErrorAlert";
import InfoAlert from "./shared/InfoAlert";
import RankTable from "./StudentRankTab/RankTable";

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
