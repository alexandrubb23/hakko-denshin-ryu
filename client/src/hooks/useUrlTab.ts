import { useMemo } from "react";
import { useSearchParams } from "react-router";

interface TabItem {
  id: string;
}

interface UseUrlTabResult {
  activeTabIndex: number;
  handleTabChange: (_: React.SyntheticEvent, index: number) => void;
}

const useUrlTab = <T extends TabItem>(
  items: T[] | undefined,
  paramKey: string
): UseUrlTabResult => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTabIndex = useMemo(() => {
    const param = searchParams.get(paramKey);
    const idx = items?.findIndex((item) => item.id === param) ?? -1;
    return idx >= 0 ? idx : 0;
  }, [searchParams, items, paramKey]);

  const handleTabChange = (_: React.SyntheticEvent, index: number) => {
    if (!items) return;
    setSearchParams({ [paramKey]: items[index].id }, { replace: true });
  };

  return { activeTabIndex, handleTabChange };
};

export default useUrlTab;
