import { parse, stringify } from "#src/index.js";
import { stringify as cacheControlStringify } from "cache-control-parser";
import { bench, describe } from "vitest";

describe("stringify", () => {
  const value = parse(
    "max-age=1, s-maxage=2, stale-while-revalidate=3, stale-if-error=4, public, private, no-store, no-cache, must-revalidate, proxy-revalidate, immutable, no-transform",
  );
  bench( "cacheControlStringify", () => {
    cacheControlStringify( value );
  } );

  bench( "cache-controlled", () => {
    stringify(
      value,
    );
  } );
});
