class Crypt {
    constructor() {
        this.key = 0x21
    }
    encode(unEncrypted) {
        let encrypted = ""
        for (var i = 0;i < unEncrypted.length;i++) {
            encrypted += String.fromCharCode(unEncrypted.charCodeAt(i) ^ this.key)
        }
        return encrypted
    }
    decode(encrypted) {
        let unEncrypted = "";
        for (var i = 0;i < encrypted.length;i++) {
            unEncrypted += (String.fromCharCode(encrypted.charCodeAt(i) ^ this.key))
        }
        return unEncrypted
    }
    encodeObject(obj) {
        return this.encode(JSON.stringify(obj))
    }
    decodeObject(jsonStr) {
        return JSON.parse(this.decode(jsonStr))
    }
}
if (process.env.NODE_ENV === "test") {
    const aa = {
        a: 1
    }
    const crypt = new Crypt()
    console.log()
    console.log(process.env)
    const data = {
        name: 1,
        data: {
            name: 2,
            ...aaa
        }
    }
    const a = crypt.encodeObject(data)
    const b = crypt.decodeObject(a)
    console.log(JSON.stringify(b) === JSON.stringify(data))
    const test = "testnfejklj12321"
    const c = crypt.encode(test)
    const d = crypt.decode(c)
    console.log(test === d)
}
