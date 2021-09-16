//JS实现一个带并发限制的异步调度器Scheduler，保证同时运行的任务最多有两个。完善代码中Scheduler类，使得以下程序能正确输出
class Scheduler {
    constructor() {
      this.tasks = {}
      this.queue = []
      this.uid = 0
    }
    max = 2
    get taskLength() {
      return Object.keys(this.tasks).length
    }
  
    add(promiseCreator) {
      return new Promise((resolve) => {
        this.queue.push({
          id: this.uid++,
          isCreated: false,
          promiseCreator,
          resolve
        })
        this.pushTasks()
      })
    }
  
    pushTasks () {
      if (this.taskLength < this.max && this.queue.length > 0) {
        const cur = this.queue.shift()
        this.tasks[cur.id] = cur
      }
      this.startTasks()
    }
  
    startTasks () {
      for(let id in this.tasks) {
        const task = this.tasks[id]
        if (task.isCreated) {
          continue
        }
        task.isCreated = true
        task.promiseCreator().then(() => {
          task.resolve()
          delete this.tasks[id]
          this.pushTasks()
        })
      }
    }
  
    // ...
  }
  
  const timeout = (time) => new Promise(resolve => {
    setTimeout(resolve, time)
  })
  
  const scheduler = new Scheduler()
  const addTask = (time, order) => {
    scheduler.add(() => timeout(time)).then(() => console.log(order))
  }
  addTask(1000, '1')
  addTask(1000, '2')
  addTask(1000, '3')
  addTask(1000, '4')
  // 1秒后输出 1，2
  // 2秒后输出 3，4