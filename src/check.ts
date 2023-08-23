import { CacheControlDirectives } from "./parser";

interface CacheStatus {
  /**
   * Cache is good. No need to do anything
   */
  ok: boolean;
  /**
   * Cache is stale. Use cache, but fetch update
   */
  okStale: boolean;
  /**
   * Cache is ok IFF you had a network error
   */
  okError: boolean;
}

export function check(
  parsed: CacheControlDirectives,
  /**
   * Override the current `now` timestamp. 
   * @unit seconds
   */
  now_seconds = Date.now() / 1000,
) {
  const delta = now_seconds - parsed.timestamp;
  if ( parsed.immutable ) {
    return status( true, true, true );
  }
  const ok = (parsed["max-age"] || -1) >= delta;
  const staleOk = (parsed["stale-while-revalidate"] || -1) >= delta;
  const errorOk = (parsed["stale-if-error"] || -1) >= delta;
  return status( ok, staleOk, errorOk );
}

function status(
  ok: boolean,
  okStale: boolean,
  okError: boolean,
): CacheStatus {
  return {
    ok,
    okStale,
    okError,
  };
}
