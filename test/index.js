const XPromise = require('../xPromise')

const promise = new XPromise((resolve, reject) => {
    reject(2)
})

promise.then((value) => {
    console.log('value', value)
}, (reason) => {
    console.log('reason', reason)
})