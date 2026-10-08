import { beforeEach, describe, expect, it } from "vitest";

import useLangStore, { LANG_STORAGE_KEY, type Lang } from "./useLangStore";

const storeLang = (lang: Lang) =>
  localStorage.setItem(
    LANG_STORAGE_KEY,
    JSON.stringify({ state: { lang }, version: 0 })
  );

const rehydrateAt = async (url: string) => {
  window.history.replaceState({}, "", url);
  await useLangStore.persist.rehydrate();
};

describe("useLangStore ?lang query parameter", () => {
  beforeEach(() => {
    localStorage.clear();
    useLangStore.setState({ lang: "ro" });
  });

  it("applies and saves a valid ?lang", async () => {
    await rehydrateAt("/?lang=en");

    expect(useLangStore.getState().lang).toBe("en");
    expect(localStorage.getItem(LANG_STORAGE_KEY)).toContain('"lang":"en"');
  });

  it("overrides the stored language", async () => {
    storeLang("en");

    await rehydrateAt("/?lang=ro");

    expect(useLangStore.getState().lang).toBe("ro");
    expect(localStorage.getItem(LANG_STORAGE_KEY)).toContain('"lang":"ro"');
  });

  it("ignores an unknown ?lang", async () => {
    await rehydrateAt("/?lang=fr");

    expect(useLangStore.getState().lang).toBe("ro");
  });

  it("keeps the stored language without ?lang", async () => {
    storeLang("en");

    await rehydrateAt("/");

    expect(useLangStore.getState().lang).toBe("en");
  });
});
