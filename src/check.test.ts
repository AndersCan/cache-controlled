import { describe, expect, test } from "vitest";
import { check, parse } from "./index";

describe("check", () => {
  test("can check max age", () => {
    const actual = check( parse( "max-age=10" ) );
    const expected = status( true, false, false );
    expect( actual ).toEqual( expected );
  });
  test("can check expired max age", () => {
    const actual = check( parse( "max-age=10", 10 ), 21 );
    const expected = status( false, false, false );
    expect( actual ).toEqual( expected );
  });

  test("can check staleWR", () => {
    const actual = check( parse( "stale-while-revalidate=10" ) );
    const expected = status( false, true, false );
    expect( actual ).toEqual( expected );
  });

  test("can check expired staleWR", () => {
    const actual = check( parse( "stale-while-revalidate=10", 10 ), 21 );
    const expected = status( false, false, false );
    expect( actual ).toEqual( expected );
  });

  test("can check staleIE", () => {
    const actual = check( parse( "stale-if-error=10" ) );
    const expected = status( false, false, true );
    expect( actual ).toEqual( expected );
  });

  test("can check expired staleIE", () => {
    const actual = check( parse( "stale-if-error=10", 10 ), 21 );
    const expected = status( false, false, false );
    expect( actual ).toEqual( expected );
  });
});

function status(
  ok: boolean,
  okStale: boolean,
  okError: boolean,
) {
  return {
    ok,
    okStale,
    okError,
  };
}
