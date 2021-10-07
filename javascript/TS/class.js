// user strict
/**
 * 1. 有无constructor 对 new 出的实例对象无影响
 * 2. static 挂在原型上，实例没有
 */
class Person {
    static className = "Class Person"
    // protected id = -1
    static say() {
        console.log("Im a man")
    }
    log() {
        console.log(this, this.className)
    }
}

class Student extends Person {
    static className = "Class Student"
    constructor() {
        super()
        console.log("constructor Student")
    }
}

class Doctor extends Person {
    static className = "Class Doctor"
    // constructor() {
    //     super()
    //     console.log("constructor Doctor")
    // }
}
let student = new Student()
let doctor = new Doctor()
student.log()
doctor.log()