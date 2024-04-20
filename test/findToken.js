const jsonStr = `{
  "zh": {
    "x.xx.xxx": "O(∩_∩)O",
    "xx.x.xxx": "O(∩_∩)O"
  },
  "en": {
    "x.xx.xxx": "(●'◡'●)",
    "xx.x.xxx": "特殊字符测试：- \" \n - \r - \t - \\ - \\"
  }
}`

const json = JSON.parse(jsonStr, (key, val) => {
  console.log(key, val)
  return encodeURI(val)
})
console.log(json)
