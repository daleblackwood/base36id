const base36 = require("./index");

function assertEqual(a, b) {
    if (a !== b) throw "(" + a.toString() + " !== " + b.toString() + ")";
}

const knownValues = {
    "0": 0,
    "A": 10,
    "Z": 35,
    "10": 36,
    "ABCDEFG": 22453731916,
    "HIJLMNO": 38126612724,
    "PQRSTUV": 56038373671,
    "WXYZ": 1537019,
    "HYRULE": 1086331298,
    "2GOSA7PA2GV": Number.MAX_SAFE_INTEGER
};

Object.entries({

    "characters should convert to numbers": () => {
        Object.entries(knownValues).map(([key, value]) => {
            assertEqual(base36.uintToBase36(value), key);
        });
    },

    "numbers should convert to characters": () => {
        Object.entries(knownValues).map(([key, value]) => {
            assertEqual(base36.uintFromBase36(key), value);
        });
    },

    "case-insensitive": () => {
        assertEqual(base36.uintFromBase36("Hyrule"), knownValues["HYRULE"]);
        assertEqual(base36.uintFromBase36("hYRUle"), knownValues["HYRULE"]);
    },

    "uint convert": () => {
        for (const key of Object.keys(knownValues)) {
            const uints = base36.uintArrayFromBase36(key, 2);
            for (const uint of uints) {
                assertEqual(uint < 36 * 36, true);
            }
            const andBack = base36.uintArrayToBase36(uints);
            assertEqual(key, andBack);
        }
    }


}).map(([name, test], index) => {
    console.log(`Test ${index + 1}: ${name}...`);
    try { 
        test();
        console.info(" - passed");
    } catch (e) { 
        console.error("- failed", e);
        process.exit(1);
    }
});
console.log("All tests passed");
process.exit(0);