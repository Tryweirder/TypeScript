/// <reference path="fourslash.ts" />

//@Filename: a.ts
////[|var [|{| "isDefinition": true, "declarationRangeIndex": 0 |}x|]: number;|]

//@Filename: b.ts
/////// <reference path="a.ts" />
////[|{| "isWriteAccess": true |}x|]++;

//@Filename: c.ts
/////// <reference path="a.ts" />
////[|{| "isWriteAccess": true |}x|]++;

verify.singleReferenceGroup("var x: number", test.rangesByText().get("x"));
