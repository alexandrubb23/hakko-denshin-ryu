import { useMyRanks } from "@features/student/ranks/hooks/useMyRanks";

import ErrorAlert from "@components/shared/ErrorAlert";
import InfoAlert from "@components/shared/InfoAlert";
import FormattedMessage from "@components/ui/FormattedMessage/FormattedMessage";
import RankTable from "@features/admin/ranks/components/RankTable";

const noop = () => {};

const MyRankTab = () => {
  const { data: ranks, isLoading, isError } = useMyRanks();

  return (
    <>
      {isError && (
        <ErrorAlert>
          <FormattedMessage id="student.ranks.error" />
        </ErrorAlert>
      )}

      {!isLoading && !isError && ranks?.length === 0 && (
        <InfoAlert>
          <FormattedMessage id="student.ranks.empty" />
        </InfoAlert>
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
