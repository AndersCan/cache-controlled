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
  const xs = Object.keys( parsed );
  for ( let i = 0; i < xs.length; i++ ) {
    const directiveName = xs[i];
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
