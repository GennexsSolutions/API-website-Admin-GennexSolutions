const express =require ("express")
const {Storage} =require ('@google-cloud/storage')
const  path = require('path')



const projectId = "gennex-solutions"
const keyFilename = "gennex-solutions-firebase-adminsdk-qga4k-ff6578f3ce.json"
const bucketName = "gennex-solutions.appspot.com"

const storage = new Storage({
    projectId,
    keyFilename: path.join(__dirname, '../config/' + keyFilename)
})

const myBucket = storage.bucket(bucketName)

const router = express()

router.get('/:image_name', (req, res, next) => {

    try {

        if (req.params.image_name) {

            // const path_name = '/${req.params.image_name} ⁠'
            
            // let ftype = file_mime[path.extname(path_name).slice(1)] || 'text/plain';

            let file = myBucket.file(req.params.image_name)

            file.exists().then(fres => {

                if (fres[0]) {

                    let readStream = file.createReadStream()
                    //res.setHeader("Content-Type", ftype )
                    readStream.pipe(res)

                } else {
                    return res.redirect('/saolao-cover.jpg')
                }

            })
                .catch(err => {

                    return res.redirect('/saolao-cover.jpg')

                })


        } else {
            
            return res.redirect('/saolao-cover.jpg')
        }
        
        
    } catch (error) {

        res.status(404).end()
        
    }

})

module.exports= router