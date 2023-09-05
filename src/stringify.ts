import { CacheControlDirectives } from "./parser";
/**
 * Stringifies the given CacheControlDirective
 *
 * @note Unknown/extra keys will not be filtered out
 */
export function stringify(
  parsed: Omit<CacheControlDirectives, "timestamp">,
) {
  let result = "";
  const keys = Object.keys( parsed );
  for ( let i = 0; i < keys.length; i++ ) {
    const directiveName = keys[i];
    if ( directiveName === "timestamp" ) continue;
    // @ts-expect-error `directiveName` could be any
    const value = parsed[directiveName];

    if ( typeof value === "number" ) {
      result += `${directiveName}=${value},`;
    } else if ( value === true ) {
      result += `${directiveName},`;
    }
  }
  return result.slice( 0, -1 );
}
