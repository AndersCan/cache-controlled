# cache-controlled

Simplifies working with `Cache-Control` headers

## Parse

Parse a `cache-control` header. Parsing is case insensitive and all spaces are ignored.

```js
import { parse } from "cache-controlled";

parse( "max-age=10" );
// { "max-age": 10 }
parse( "public, max-age=10, stale-while-revalidate=600" );
// { "max-age": 10, public: true, "stale-while-revalidate": 600 }

// For convenience, also handles `undefined` and `string[]`
parse( undefined ); // {}
parse( [ "public", "max-age=10" ] ); // { "max-age": 10, public: true }
```

> Note: `parse` also adds a `timestamp` field used by `check`.

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

_Note: `check` only reads `immutable`, `max-age`, and `stale-` directives._

```js
const status =
  check( parse( "immutable, must-revalidate, no-store, no-cache" ) ).ok; // true
```

## string

Helper to write a typesafe cache control header

```js
string( "public, max-age=10, stale-while-revalidate=600" );
// public, max-age=10, stale-while-revalidate=600

// Unknown keys won't be filtered out
// @ts-expect-error typo - should be `max-age`
string( "maxage=1" ); // never
// @ts-expect-error missing value
string( "maxage" ); // never
```

## stringify

```js
stringify( { public: true, "max-age": 10, "stale-while-revalidate": 600 } );
// public,max-age=10,stale-while-revalidate=600

// Unknown keys won't be filtered out
// @ts-expect-error Unknown key
stringify( { unknown: 42 } ); // unknown=42
```

## Other libraries

If you need to handle all headers related to HTTP caching, check out [http-cache-semantics](https://www.npmjs.com/package/http-cache-semantics).

This library is more compareable to [cache-control-parser](https://github.com/etienne-martin/cache-control-parser)
