import { describe, expect, test } from "vitest";
import { parse, stringify } from "./index";

describe("stringify", () => {
  test("can stringify empty", () => {
    const input = "";
    const actual = stringify( parse( input ) );
    const expected = input;
    expect( actual ).toEqual( expected );
  });
  test("can stringify max-age", () => {
    const input = "max-age=10";
    const actual = stringify( parse( input ) );
    const expected = input;
    expect( actual ).toEqual( expected );
  });
  test("can stringify max-age with stale-wr", () => {
    const input = "max-age=10,stale-while-revalidate=600";
    const actual = stringify( parse( input ) );
    const expected = input;
    expect( actual ).toEqual( expected );
  });
  test("can stringify max-age with stale-err", () => {
    const input = "max-age=10,stale-if-error=600";
    const actual = stringify( parse( input ) );
    const expected = input;
    expect( actual ).toEqual( expected );
  });
  test("stringify of `false` is not returned", () => {
    {
      const actual = stringify( { ["no-store"]: false } );
      const expected = "";
      expect( actual ).toEqual( expected );
    }
  });
  test("stringify of `true` is returned", () => {
    const actual = stringify( { ["no-store"]: true } );
    const expected = "no-store";
    expect( actual ).toEqual( expected );
  });

  test("parse -> stringify -> parse equals parse", () => {
    const input = parse(
      "no-cache,no-store,no-transform,must-revalidate,proxy-revalidate,private,public,immutable,max-age=1,s-maxage=2,stale-while-revalidate=3,stale-if-error=4",
    );
    const actual = parse( stringify( input ) );
    const expected = input;
    expect( actual ).toEqual( expected );
  });
});
