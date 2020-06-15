const PENDING = 'pending'
const fULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
    constructor(executor) {
        this.state = PENDING
        this.value = null;

        const resolve = (value) => {
            if (this.state === PENDING) {
                this.value = value
                this.state = fULFILLED
            }
        }

        const reject = (reason) => {
            if (this.state === PENDING) {
                this.value = reason
                this.state = REJECTED
            }
        }

        try {
            executor(resolve, reject)
        } catch (reason) {
            reject(reason)
        }
    }

    
}