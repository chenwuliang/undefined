
/**
 * 2. 保留 n 位有效数字
 * @param {v} number 'value'
 * @param {x} number '保留的位数'
 * @returns string
 */
 const toFloatX = (v, x) => v.toFixed(x)

 /**
  * @param {*} n  check 保留的位数
  * @return Boolean
  */
 let checkFloat = n => new RegExp(`^[1-9]+[0-9]*(.[0-9]{${n}})$`)
 
 let isFloat5 = v => checkFloat(5).test(v)
 let num5 = toFloatX(1001.1232146574189284937, 5)
 
 let r = isFloat5(num5)
 
 