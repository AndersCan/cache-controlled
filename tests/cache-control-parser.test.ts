import { parse as rawParse } from "#src/index.js";
import { describe, expect, test } from "vitest";
const parse = ( input: string ) => {
  const { timestamp, ...rest } = rawParse( input );
  return rest;
};
// https://github.com/etienne-martin/cache-control-parser
describe("cache-control-parser test suite", () => {
  test.skip("should override previously declared directives", () => {
    expect( parse( "max-age=1, max-age=2" ) ).toEqual( {
      "max-age": 2,
    } );
  });

  test("should parse empty cache-control header", () => {
    expect( parse( "" ) ).toEqual( {} );
  });

  test("should parse both boolean and numeric directives", () => {
    expect(
      parse(
        "max-age=1, s-maxage=2, stale-while-revalidate=3, stale-if-error=4, public, private, no-store, no-cache, must-revalidate, proxy-revalidate, immutable, no-transform",
      ),
    ).toEqual( {
      "max-age": 1,
      "s-maxage": 2,
      "stale-while-revalidate": 3,
      "stale-if-error": 4,
      public: true,
      private: true,
      "no-store": true,
      "no-cache": true,
      "must-revalidate": true,
      "proxy-revalidate": true,
      immutable: true,
      "no-transform": true,
    } );
  });

  test("should trim directives", () => {
    expect(
      parse( "   max-age =  60 ,    s-maxage  = 3600 , public   " ),
    ).toEqual( {
      "max-age": 60,
      "s-maxage": 3600,
      public: true,
    } );
  });

  test("should be case-insensitive", () => {
    expect( parse( "Max-Age=1, S-MAXAGE=2, Stale-While-Revalidate=3" ) )
      .toEqual(
        {
          "max-age": 1,
          "s-maxage": 2,
          "stale-while-revalidate": 3,
        },
      );
  });

  test("should support directives that are not separated by spaces", () => {
    expect( parse( "max-age=60,public" ) ).toEqual( {
      "max-age": 60,
      public: true,
    } );
  });

  test("should ignore invalid directives", () => {
    expect(
      parse(
        "max-age=NaN, s-maxage=NaN, stale-while-revalidate=NaN, stale-if-error=NaN",
      ),
    ).toEqual( {} );
  });

  test("should not override previously declared directives if the directive is invalid", () => {
    expect( parse( "max-age=1, max-age=NaN" ) ).toEqual( {
      "max-age": 1,
    } );
  });

  test("should ignore unknown directives", () => {
    expect( parse( "unknown-directive" ) ).toEqual( {} );
  });

  test("should ignore unknown directives", () => {
    expect( parse( "unknown-directive=value" ) ).toEqual( {} );
  });
});
