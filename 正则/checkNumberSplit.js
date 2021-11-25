const reg = /^(\d+,)*\d+$/
const values = [
    { value: '12', res: true },
    { value: '12,13', res: true },
    { value: '12,13,', res: false },
    { value: 'a', res: false },
    { value: '12,13 ', res: false },
    { value: '', res: false },
    { value: ' ', res: false },
    { value: '12，', res: false }
]

values.map((item) => {
    const ret = reg.test(item.value) === item.res
    if (ret === false) console.log('验证失败' + item.value, ret)
})