import { describe, expect, it } from "vitest";

import { facebookShareUrl, whatsappShareUrl } from "./shareLinks";

const PAGE_URL = "https://senshinkan.ro/events/taikai-2025";

describe("facebookShareUrl", () => {
  it("shares the page, encoded", () => {
    expect(facebookShareUrl(PAGE_URL)).toBe(
      "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fsenshinkan.ro%2Fevents%2Ftaikai-2025"
    );
  });
});

describe("whatsappShareUrl", () => {
  it("sends the text, then the link on its own line", () => {
    const url = new URL(whatsappShareUrl("Taikai 2025 · Belgium", PAGE_URL));
    expect(url.origin + url.pathname).toBe("https://wa.me/");
    expect(url.searchParams.get("text")).toBe(
      `Taikai 2025 · Belgium\n${PAGE_URL}`
    );
  });
});
