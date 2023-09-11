import { describe, expect, test } from "vitest";
import { string } from "./index";

describe("string", () => {
  test("can`t string empty", () => {
    const input = "";
    // @ts-expect-error
    const actual = string( input );
  });
  test("can string max-age", () => {
    const input = "max-age=10";
    const actual: "max-age=10" = string( input );
    const expected = input;
    expect( actual ).toEqual( expected );
  });
  test("can string max-age with stale-wr", () => {
    const input = "max-age=10, stale-while-revalidate=600";
    const actual: "max-age=10, stale-while-revalidate=600" = string( input );
    const expected = input;
    expect( actual ).toEqual( expected );
  });
  test("can string no store", () => {
    {
      const actual: "no-store" = string( "no-store" );
      const expected = "no-store";
      expect( actual ).toEqual( expected );
    }
  });
});
