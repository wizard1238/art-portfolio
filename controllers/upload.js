let fs = require('fs')

exports.get = function(req, res, next) {
    fs.readdir("./public/images/art", (dirErr, files) => {
        if (dirErr) console.log(dirErr)

        let images = []

        files.forEach((filename) => {
            let promise = new Promise((resolve, reject) => {
                fs.readFile(`./public/images/art/${filename}`, (fileErr, data) => {
                    if (fileErr) console.log(fileErr)
                    resolve(data)
                })
            })
            images.push(promise)
        })
        
        Promise.all(images)
        .then((data) => {
            let send = []

            data.forEach((i) => {
                send.push(new Buffer.from(i).toString('base64'))
            })

            res.send(send)
        })
    })
}

exports.upload = function(req, res, next) {
    res.sendStatus(200)
}

exports.reorder = async function(req, res, next) {
    let inputOrder = req.body
    

    fs.readdir("./public/images/art", (dirErr, files) => {
        if (dirErr) console.log(dirErr)
        
        let promises = []
        for (let i = 0; i < inputOrder.length; i++) {
            let promise = new Promise((resolve, reject) => {
                fs.rename(`./public/images/art/${files[i]}`, `./public/images/art/${parseInt(inputOrder[i]) + inputOrder.length}`, (err) => {
                    if (err) console.log(err)
                    resolve()
                })
            })
    
            promises.push(promise)
        }

        Promise.all(promises)
        .then(() => {
            fs.readdir("./public/images/art", (dirErr, changedFiles) => {
                if (dirErr) console.log(dirErr)

                for (let i = 0; i < inputOrder.length; i++) {
                    fs.rename(`./public/images/art/${changedFiles[i]}`, `./public/images/art/${parseInt(changedFiles[i]) - inputOrder.length}`, (err) => {
                        if (err) console.log(err)
                    })
                }
            })
        })
    })
    

    

    res.sendStatus(200)
}

exports.delete = function(req, res, next) {
    let promises = []

    fs.readdir("./public/images/art", (dirErr, files) => {
        if (dirErr) console.log(dirErr)
        req.body.forEach((i) => {
            let promise = new Promise((resolve, reject) => {
                fs.unlink(`./public/images/art/${files[i]}`, (err) => {
                    if (err) console.log(err)
                    resolve()
                })
            })
            promises.push(promise)
        })
    
        Promise.all(promises)
        .then(() => {
            res.sendStatus(200)
        })
    })
}