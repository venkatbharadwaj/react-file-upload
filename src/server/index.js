const express = require('express');
const cors = require('cors'); 
const os = require('os');
const fs = require('fs');
const multer = require('multer');
const parse = require('csv-parse');

const fileLocation = { dir: './uploads/', file: 'data.csv'};

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, fileLocation.dir);
    },
    filename: function (req, file, cb) {
        cb(null, fileLocation.file);
    }
});
const upload = multer({ storage: storage });

const app = express();
app.use(cors());//

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => {
    res.send({ username: os.userInfo().username });
});
app.post('/api/upload', upload.single('file'),  (req, res) => {
    const file = req.file
    console.log(file)
    if (!file) {
        throw Error('Unable to upload file');
    }
    res.send({uploaded: true});
});
app.get('/api/data/:delimiter/row/:rowCount', (req, res)=>{
    let { delimiter,rowCount}  = req.params;
    let inputFile = './uploads/data.csv';
    fs.createReadStream(inputFile).pipe(parse({ delimiter, to: rowCount}, (err, data)=>{
        console.log(data)
        res.send({ data});
    }));
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
