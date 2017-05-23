const express = require('express')
const formidable = require('formidable')
const fs = require('fs')
const metastore = require('nedb')

//config TODO make cmd line args
const data_dir = "D:/objectstore/"
const meta_dir = "D:/objectstore/meta/"
//Config variables
const object_store_port = 3000

var app = express()
var meta = new metastore({
    filename : meta_dir + "object.meta",
    autoload : true
})
var router = express.Router()

//Middleware
router.use((req, res, next) => {
    console.log(req.method + " request on URL : " + req.url)
    next()
})

//Routes

router.route('/objectstore/:object_key')
    .get((req, res) => {
        const key = req.params.object_key
        //Lookup metadata
        meta.findOne({object_key : key}, (err, object_metadata) => {
            if (object_metadata) {
                res.writeHead(200, {"Content-Type" : "application/octet-stream",
                                    "Content-Disposition" : "attachment; filename="+object_metadata.object_name })
                fs.createReadStream(object_metadata.object_path).pipe(res)
            } else {
                res.writeHead(400, {"Content-Type" : "text/plain"})
                res.end("Object not found")
            }
        })
    })
    
    .delete((req, res) => {
        const key = req.params.object_key
        meta.findOne({object_key : key}, (err, object_metadata) => {
            if (object_metadata) {
                const object_path = object_metadata.object_path
                meta.remove({object_key : key}, (err, is_found) => {
                    if (is_found) {
                        res.writeHead(200, {"Content-Type" : "text/plain"})
                        res.end("Object DELETED")
                        fs.unlink(object_path, (err) => {
                            if (err) throw err
                        })
                    }
                })    
            } else {
                res.writeHead(400, {"Content-Type" : "text/plain"})
                res.end("Object not found")
            }
        })
    })

router.route('/objectstore')
    .post((req, res) => {
        var form = formidable.IncomingForm()
        form.uploadDir = data_dir
        form.parse(req, (err, fields, files) => {
            if (err) throw err

            const path = files.file.path
            const key = fields.key
            const name = files.file.name

            //Add metadata to meta-file
            meta.insert({object_key : key, object_name : name, object_path : path}, (err, new_meta_obj) => {
                if (err) throw err
                console.log("META file updated.")
                res.send("Object POST successful")
                res.end()
            })
        })
    })

app.use("/", router)
app.listen(object_store_port, () => {
    console.log("Object store listening on port: " + object_store_port)
})