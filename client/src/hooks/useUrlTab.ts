import { useMemo } from "react";
import { useSearchParams } from "react-router";

interface TabItem {
  id: string;
}

interface UseUrlTabResult {
  activeTabIndex: number;
  /** Shows the tab at `index` and records its id in the URL */
  selectTab: (index: number) => void;
  /** `selectTab` with the signature of MUI's `Tabs` `onChange` */
  handleTabChange: (_: React.SyntheticEvent, index: number) => void;
}

/**
 * The active tab, kept in the URL's `paramKey` query parameter so it survives
 * a reload or a shared link. Other parameters are left alone, so a page can
 * hold several tab sets, each under its own key.
 */
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

  const selectTab = (index: number) => {
    const item = items?.[index];
    if (!item) return;
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set(paramKey, item.id);
        return next;
      },
      { replace: true }
    );
  };

  const handleTabChange = (_: React.SyntheticEvent, index: number) =>
    selectTab(index);

  return { activeTabIndex, selectTab, handleTabChange };
};

export default useUrlTab;
