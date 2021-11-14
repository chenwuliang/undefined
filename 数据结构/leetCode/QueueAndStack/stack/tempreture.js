const dailyTemperatures = (T) => {
    const res = new Array(T.length).fill(0)
    const stack = []
    for (let i = T.length - 1; i >= 0; i--) {
      while (stack.length && T[i] >= T[stack[stack.length - 1]]) {
        stack.pop()
      }
      if (stack.length) {
        res[i] = stack[stack.length - 1] - i
      }
      stack.push(i)
    }
    return res
}
  

let r = dailyTemperatures([1, 2, 3])
console.log(r)