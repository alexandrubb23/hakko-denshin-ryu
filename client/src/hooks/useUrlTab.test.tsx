import { act, renderHook } from "@testing-library/react";
import { MemoryRouter, useSearchParams } from "react-router";
import { describe, expect, it } from "vitest";

import useUrlTab from "./useUrlTab";

const ITEMS = [{ id: "shodan-gi" }, { id: "nidan-gi" }];

const renderUrlTab = (url: string) =>
  renderHook(
    () => ({
      tab: useUrlTab(ITEMS, "grade"),
      params: useSearchParams()[0],
    }),
    {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={[url]}>{children}</MemoryRouter>
      ),
    }
  );

describe("useUrlTab", () => {
  it("opens on the tab named in the URL", () => {
    const { result } = renderUrlTab("/?grade=nidan-gi");
    expect(result.current.tab.activeTabIndex).toBe(1);
  });

  it("falls back to the first tab for a missing or unknown id", () => {
    expect(renderUrlTab("/").result.current.tab.activeTabIndex).toBe(0);
    expect(renderUrlTab("/?grade=nope").result.current.tab.activeTabIndex).toBe(
      0
    );
  });

  it("records the selected tab, keeping the other parameters", () => {
    const { result } = renderUrlTab("/?level=3e-kyu");

    act(() => result.current.tab.selectTab(1));

    expect(result.current.tab.activeTabIndex).toBe(1);
    expect(result.current.params.get("grade")).toBe("nidan-gi");
    expect(result.current.params.get("level")).toBe("3e-kyu");
  });
});
