const XPromise = require('../xPromise')

const promise = new XPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(1)
    }, 3000)
})

const promise2 = promise.then((value) => {
    console.log('value1', value)
    return new Error('你好啊 错误')
}, (reason) => {
    console.log('reason1', reason)
})


promise2.then((value) => {
    console.log('value2', value)
}, (reason) => {
    console.log('reason2', reason)
})