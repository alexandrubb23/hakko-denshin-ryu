import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import useProgressiveImg from "./useProgressiveImg";

// Images whose decoding the test settles by hand
let decodes: (() => void)[] = [];

class FakeImage {
  src = "";
  decode = () => new Promise<void>((resolve) => decodes.push(resolve));
}

const finishDecoding = () =>
  act(async () => {
    decodes.forEach((resolve) => resolve());
    decodes = [];
  });

describe("useProgressiveImg", () => {
  beforeEach(() => vi.stubGlobal("Image", FakeImage));
  afterEach(() => {
    vi.unstubAllGlobals();
    decodes = [];
  });

  it("shows the placeholder, blurred, until the full image decodes", async () => {
    const { result } = renderHook(() =>
      useProgressiveImg({ lowQualitySrc: "a-small", highQualitySrc: "a" })
    );
    expect(result.current).toEqual(["a-small", { blur: true }]);

    await finishDecoding();
    expect(result.current).toEqual(["a", { blur: false }]);
  });

  it("starts on an image it has already loaded", async () => {
    const props = { lowQualitySrc: "b-small", highQualitySrc: "b" };
    renderHook(() => useProgressiveImg(props));
    await finishDecoding();

    const { result } = renderHook(() => useProgressiveImg(props));
    expect(result.current).toEqual(["b", { blur: false }]);
  });

  it("stays on the placeholder without a full image", () => {
    const { result } = renderHook(() =>
      useProgressiveImg({ lowQualitySrc: "c-small", highQualitySrc: "" })
    );
    expect(result.current).toEqual(["c-small", { blur: true }]);
    expect(decodes).toHaveLength(0);
  });
});
