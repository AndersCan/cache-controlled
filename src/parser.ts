/**
 * Directive documentation
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#cache_directives
 */
export type CacheControlDirectives =
  & Partial<CacheControlNums>
  & Partial<CacheControlBools>
  & Timestamp;

type Timestamp = {
  /**
   * Time in seconds when generated
   */
  timestamp: number;
};

type NumberDirective = keyof CacheControlNums;
type CacheControlNums = {
  "max-age": number;
  "s-maxage": number;
  "stale-while-revalidate": number;
  "stale-if-error": number;
};
type BoolDirective = keyof CacheControlBools;
type CacheControlBools = {
  "no-cache": boolean;
  "no-store": boolean;
  "no-transform": boolean;
  "must-revalidate": boolean;
  "proxy-revalidate": boolean;
  "must-understand": boolean;
  "private": boolean;
  "public": boolean;
  "immutable": boolean;
};
const trueDirectives: Readonly<(keyof CacheControlBools)[]> = [
  "no-cache",
  "no-store",
  "no-transform",
  "must-revalidate",
  "proxy-revalidate",
  "must-understand",
  "private",
  "public",
  "immutable",
];

const valueDirectivesRegExp = [
  /(max-age)=(\d+)/,
  /(s-maxage)=(\d+)/,
  /(stale-while-revalidate)=(\d+)/,
  /(stale-if-error)=(\d+)/,
];
export function parse(
  /**
   * Handles the most common return types the parse the `cache-control` header
   */
  cacheControlHeader: string | string[] | undefined | null,
  /**
   * Override the timestamp for when this cache was created
   * @unit seconds
   */
  timestamp = Date.now() / 1000,
): CacheControlDirectives {
  const result: CacheControlDirectives = { timestamp };

  if ( !cacheControlHeader ) return result;
  const asString = typeof cacheControlHeader === "string"
    ? cacheControlHeader
    : cacheControlHeader.join( "," );

  let clean = asString.replace( /\s/g, "" ).toLowerCase();
  for ( const dir of trueDirectives ) {
    const i = clean.indexOf( dir );
    if ( i !== -1 ) {
      result[dir as BoolDirective] = true;
    }
  }

  for ( const regexp of valueDirectivesRegExp ) {
    // @ts-expect-error this is fine as long as valueDirectivesRegExp does not change :)
    const value: [ unknown, NumberDirective, string ] | null = regexp.exec(
      clean,
    );

    if ( value && value[1] && value[2] ) {
      result[value[1]] = Number( value[2] );
    }
  }
  return result;
}
