import { Alert } from "@mui/material";

import { useMyRanks } from "@hooks/useMyRanks";

import InfoAlert from "./shared/InfoAlert";
import RankTable from "./StudentRankTab/RankTable";

const noop = () => {};

const MyRankTab = () => {
  const { data: ranks, isLoading, isError } = useMyRanks();

  return (
    <>
      {isError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Failed to load rank history. Please try again.
        </Alert>
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
