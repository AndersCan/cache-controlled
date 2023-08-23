import { describe, expect, test } from "vitest";
import { parse as rawParse } from "./index";

const parse = ( input: string ) => {
  const { timestamp, ...rest } = rawParse( input );
  return rest;
};

describe("parse", () => {
  test("can parse max age", () => {
    const actual = parse( "max-age=10" );
    const expected = { "max-age": 10 };
    expect( actual ).toEqual( expected );
  });

  test("can parse multi", () => {
    const actual = parse( "public, max-age=10, stale-while-revalidate=600" );
    const expected = {
      "max-age": 10,
      public: true,
      "stale-while-revalidate": 600,
    };
    expect( actual ).toEqual( expected );
  });
});
