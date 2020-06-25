var express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
const zip = require('express-easy-zip')
const fsExtra = require('fs-extra')
const fs = require('fs');
const PORT = process.env.PORT || 3000;
const dirPath = __dirname + "/uploads";

var app = express();
app.use(fileUpload({
    createParentPath: true
}));
app.use(cors());
app.use(zip());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));


app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/upload-svg-born', async (req, res) => {
    try {
        if (!fs.existsSync('./uploads/')){
            fs.mkdirSync('./uploads/');
        }
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            const regex_name=/(_[x]+.svg)/;
            const svg = req.files.svg;
            const start = req.body.start;
            const end = req.body.end;
            const base_name = svg.name.split(regex_name)[0];
            const text = svg.data.toString();
            for(let i=start;i<=end;i++){
                
                
                body = text.replace("xxx",i);
                svg.data=body;
                fs.writeFileSync('./uploads/' + base_name+"_"+i+".svg",body);
               
            }

            await res.zip({
                files: [{
                    path: dirPath,
                    name: 'files'
                }],
                filename: 'files.zip'
            });
            fsExtra.emptyDirSync('./uploads/')

        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/upload-svg-thisisHow', async (req, res) => {
    try {
        if (!fs.existsSync('./uploads/')){
            fs.mkdirSync('./uploads/');
        }
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            const regex_name=/(_[y]+.svg)/;
            const svg = req.files.svg;
            let words = req.body.text;
            const csv = req.files.csv;
            console.log(typeof words);
            if(words.length==0){
                console.log("passed");
                words = csv.data.toString();
            }
            const parsedWords = words.split(",");
            console.log(parsedWords);
            
            const base_name = svg.name.split(regex_name)[0];
            const text = svg.data.toString();
            for(let i=0;i<parsedWords.length;i++){
                
                
                body = text.replace("yyy",parsedWords[i]);
                svg.data=body;
                fs.writeFileSync('./uploads/' + base_name+"_"+parsedWords[i]+".svg",body);
               
            }

            await res.zip({
                files: [{
                    path: dirPath,
                    name: 'files'
                }],
                filename: 'files.zip'
            });
            fsExtra.emptyDirSync('./uploads/')

        }
    } catch (err) {
        res.status(500).send(err);
    }
});


app.listen(PORT, function () {
  console.log('Example app listening');
});