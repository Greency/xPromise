const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
    constructor(executor) {
        this.state = PENDING
        this.value = null
        this.reason = null
        this.fulfiledCallbacks = []
        this.rejectedCallbacks = []

        const resolve = (value) => {
            if (this.state === PENDING) {
                this.state = FULFILLED
                this.value = value
                this.fulfiledCallbacks.forEach(fulfiledCallback => fulfiledCallback())
            }
        }

        const reject = (reason) => {
            if (this.state === PENDING) {
                this.state = REJECTED
                this.reason = reason
                this.rejectedCallbacks.forEach(rejectedCallback => rejectedCallback())
            }
        }

        try {
            executor(resolve, reject)
        } catch (reason) {
            reject(reason)
        }
    }

    then(onFulfilled, onRejected) {
        const promise2 = new MyPromise((resolve, reject) => {
            if (this.state === PENDING) {
                this.fulfiledCallbacks.push(() => {
                    try {
                        onFulfilled(this.value)
                    } catch (reason) {
                        reject(reason)
                    }
                })
                this.rejectedCallbacks.push(() => {
                    try {
                        onRejected(this.reason)   
                    } catch (reason) {
                        reject(reason)
                    }
                })
            } else if (this.state === FULFILLED) {
                if (typeof onFulfilled !== 'function') {
                    resolve(this.value)
                } else {
                    try {
                        onFulfilled(this.value)
                    } catch (reason) {
                        reject(reason)
                    }
                }
            } else if (this.state === REJECTED) {
                if (typeof onRejected !== 'function') {
                    reject(this.reason)
                } else {
                    try {
                        onRejected(this.reason)   
                    } catch (reason) {
                        reject(reason)
                    }
                }
            }
        })

        return promise2
    }

    resolvePromise(promise, x) {
        
    }
}

module.exports = MyPromise