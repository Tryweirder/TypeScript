/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true

// @Filename: /a.js
////[|[|{| "declarationRangeIndex": 0 |}module|].exports = [|class [|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 2 |}C|] {}|];|]
////[|module.exports.[|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 4 |}D|] = [|class [|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 6 |}D|] {}|];|]

// @Filename: /b.js
/////** @type {import("[|./a|]")} */
////const x = 0;
/////** @type {import("[|./a|]").[|D|]} */
////const y = 0;

verify.noErrors();

// TODO: GH#24025

const [rModuleDef, rModule, r0Def, r0, r1Def, r1, r2Def, r2, r3, r4, r5] = test.ranges();
verify.referenceGroups(rModule, [{ definition: 'module "/a"', ranges: [r3, r4, rModule] }]);
verify.referenceGroups(r0, [
    { definition: "(local class) C", ranges: [r0] },
    // TODO: This definition is really ugly
    { definition: "(alias) (local class) export=\nimport export=", ranges: [r3] },
]);
verify.referenceGroups([r1, r5], [
    { definition: "class D\n(property) D: typeof D", ranges: [r1, r5, r5] }, // TODO: should only reference r5 once
]);
verify.referenceGroups(r2, [
    { definition: "(local class) D", ranges: [r2] },
    { definition: "class D\n(property) D: typeof D", ranges: [r5] },
]);
verify.referenceGroups([r3, r4], [
    { definition: 'module "/a"', ranges: [r4, rModule] },
    { definition: "(local class) C", ranges: [r0] },
    { definition: "(alias) (local class) export=\nimport export=", ranges: [r3] },
]);
