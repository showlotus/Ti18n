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

let str = `const a = 1;

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

Object.keys(obj).forEach(key => {
  const regex = new RegExp(`(["'\`])${key}\\1`, "g");
  let match;
  while ((match = regex.exec(str))) {
    const start = match.index;
    const end = match.index + key.length + 2;
    console.log(start, end);
    console.log(str.slice(start, end));
  }
});

const res = Object.entries(obj)
  .map(([key, val]) => `\`${key}\`：${val}`)
  .join("\n\n");
console.log(res);
