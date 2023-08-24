# cache-controlled

Simplifies working with `Cache-Control` headers

## Parse

Parse a `cache-control` header. Parsing is case insensitive and all spaces (``) are ignored.

```js
import { parse } from "cache-controlled";

parse( "max-age=10" );
// { "max-age": 10 }
parse( "public, max-age=10, stale-while-revalidate=600" );
// { "max-age": 10, public: true, "stale-while-revalidate": 600 }
```

> Note: `parse` also adds a `timestamp` field for `check`.

## Check

`check` will tell you if you can still use your cached content:

- `ok`: Cache is ok. No need to do anything
- `okStale`: Cache is ok, but stale. Fetch update
- `okError`: Cache is ok IFF you had/have a network error

```js
const status = check( parse( "max-age=10" ) ).ok; // true
// If the `immutable` directive is present, it will always return `true`
const status = check( parse( "immutable" ) ).ok; // true
const status = check( parse( "stale-while-revalidate=10" ) ).ok; // false
const status = check( parse( "stale-while-revalidate=10" ) ).okStale; // true
const status = check( parse( "stale-if-error=10" ) ).okError; // true
```

*Note: `check` only reads `immutable`, `max-age`, and `stale-` directives.*

```js
const status =
  check( parse( "immutable, must-revalidate, no-store, no-cache" ) ).ok; // true
```

## Other libraries

Simpler than [http-cache-semantics](https://www.npmjs.com/package/http-cache-semantics), similar to [cache-control-parser](https://github.com/etienne-martin/cache-control-parser)
