import { parse } from "#src/index.js";
import { parse as cacheControlParser } from "cache-control-parser";
import { bench, describe } from "vitest";

describe("parse", () => {
  bench( "cacheControlParser", () => {
    cacheControlParser(
      "max-age=1, s-maxage=2, stale-while-revalidate=3, stale-if-error=4, public, private, no-store, no-cache, must-revalidate, proxy-revalidate, immutable, no-transform",
    );
  } );

  bench( "us", () => {
    parse(
      "max-age=1, s-maxage=2, stale-while-revalidate=3, stale-if-error=4, public, private, no-store, no-cache, must-revalidate, proxy-revalidate, immutable, no-transform",
    );
  } );
});
