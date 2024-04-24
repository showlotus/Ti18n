/* eslint-disable @typescript-eslint/naming-convention */
const obj = {
  $meta: {
    locales: ["zh-CN", "en-US"],
  },
  "M.Morning": {
    "zh-CN": "早上好",
    "en-US": "Good morning",
  },
  "M.Evening": {
    "zh-CN": "晚上好",
    "en-US": "Good evening",
  },
};

let str1 = `const a = 1;

let b = 2;

var c = 3;

const d = \`1111111111"M.Morning"111111111\`;

function f() {
  return {
    a: \`a;skjf'M.Morning';asjkdf;as"M.Evening"\`,
    b: "hello",
    c: {
      d: \`----'M.Morning'---\`,
    },
  };
}
`;
