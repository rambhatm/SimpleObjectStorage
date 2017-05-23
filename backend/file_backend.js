//This is the simplest form of backend. Each new bucket is just a new folder
//and every object is a file under this folder. 

var fs = require('fs')

exports.fs_write = (path, object) => {
    //Check path, create directory if it doesnt exist
    fs.access(path, fs.constants.F_OK, (err) => {
        if (err) {
            console.log("Bucket doesnt exist. Creating new bucket " + path)
            fs.mkdir(path, (err) => {
                if (err) {
                    console.log("Bucket creation failed " + err)
                    return
                }
                console.log("Bucket created")
            })
        }
        //Write Object
        fs.write
    })

    //Write object

    //Generate key

    return key;
}