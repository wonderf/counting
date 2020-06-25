var express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

var app = express();
app.use(fileUpload({
    createParentPath: true
}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/upload-svg', async (req, res) => {
    try {
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
            console.log(base_name);
            for(let i=start;i<=end;i++){
                svg.mv('./uploads/' + base_name+"_"+i+".svg");
            }
            
            

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: svg.name,
                    mimetype: svg.mimetype,
                    size: svg.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});