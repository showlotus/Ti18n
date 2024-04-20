function aa() {
  console.log('a')
}

const str = `{}`

function bb() {
  console.log('b')

  let c = 'M.Morning'
  let d = `M.Evening`
  let e = 'M.Evening'
}

const $t = (k: string) => {}

// 使用
const columns = [
  {
    title: $t('M.Morning'),
    width: 200,
  },
  {
    title: $t('M.Evening'),
    width: 200,
  },
]

const message = 'warning'
