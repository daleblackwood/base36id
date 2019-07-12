## Base36 id strings
This set of functions exists to convert various data types to and from base36 strings.


### Why a base36 string?
 - Base36 strings are great way to shorten numeric ids for external applications. For example:
`1000000` (1 million) converts down to `LFLS`.
 - Base36 strings are alphanumeric, using only commonly used letters and numbers
 - Base36 strings are case-insensitive

### Where have I seen this before?
 - Microsoft product keys
 - Various HR software


### Methods

`uintToBase36(n)` - convert a number to a base36 id string

`uintFromBase36(s)` - convert a base36 id string to a number

`uintArrayToBase36(uints, segmentLength)` - convert an array of numbers to a base36 id string at the specified segment length

`uintArrayFromBase36(s, segmentLength)` - convert a base36 id string to an array of numbers at the specified segment length

