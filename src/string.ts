type StringDirs = CacheControlBools | CacheControlNums;

type CacheControlBools =
  | "no-cache"
  | "no-store"
  | "no-transform"
  | "must-revalidate"
  | "proxy-revalidate"
  | "must-understand"
  | "private"
  | "public"
  | "immutable";

type CacheControlNums =
  | `max-age=${number}`
  | `s-maxage=${number}`
  | `stale-while-revalidate=${number}`
  | `stale-if-error=${number}`;

type Recursive<Law extends string, Type extends string> = Type extends Law
  ? Type
  : Type extends `${infer Part1}, ${infer Part2}`
    ? Part1 extends Law ? `${Part1}, ${Recursive<Law, Part2>}`
    : never
  : never;

/**
 * Write a typesafe cache control header
 */
export function string<T extends string>(
  typesafeString: Recursive<StringDirs, T>,
) {
  return typesafeString;
}
