import { describe, expect, test } from "vitest";
import { parse as rawParse } from "./index";

const parse = ( input: Parameters<typeof rawParse>[0] ) => {
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

  test("can parse undefined and null", () => {
    {
      const actual = parse( undefined );
      const expected = {};
      expect( actual ).toEqual( expected );
    }
    {
      const actual = parse( null );
      const expected = {};
      expect( actual ).toEqual( expected );
    }
  });
  test("can parse array", () => {
    const actual = parse( [
      "public",
      "max-age=10",
      "stale-while-revalidate=600",
    ] );
    const expected = {
      "max-age": 10,
      public: true,
      "stale-while-revalidate": 600,
    };
    expect( actual ).toEqual( expected );
  });

  test("array with duplicate - first wins", () => {
    const actual = parse( [
      "max-age=1",
      "max-age=2",
    ] );
    const expected = {
      "max-age": 1,
    };
    expect( actual ).toEqual( expected );
  });
});
