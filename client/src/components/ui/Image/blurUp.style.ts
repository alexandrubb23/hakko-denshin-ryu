// Blurs a low-quality placeholder, then fades the blur out once the
// full-size image replaces it (see useProgressiveImg)
export const blurUpStyle = (blur: boolean) =>
  ({
    filter: blur ? "blur(10px)" : "none",
    transition: blur ? "none" : "filter 0.3s ease-out",
    willChange: "filter",
  }) as const;
