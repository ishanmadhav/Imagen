const express=require('express')
const app=express();
const path=require('path')
const port=5000;
const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost/imagendb', {useNewUrlParser: true, useUnifiedTopology: true});

const ImageSchema=new mongoose.Schema({
    title: String,
    url: String
})

const Image=mongoose.model('Image', ImageSchema);

const demoimg1=new Image({title: 'starspic', url: 'http://localhost:5000/static/1614490002236.jpg'})
//demoimg1.save();

var multer  = require('multer')
//var upload = multer({ dest: 'public/' })

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.jpg')
    }
  })
  
var upload = multer({ storage: storage })



app.use(express.static('public'))
//app.use(express.static('upload'))
app.use('/static', express.static('public'))
//app.use('/uploads', express.static('upload'))
app.use(express.json())
app.use(express.urlencoded());




app.get('/photoslist', async (req, res)=>
{
    var imgl;
    await Image.find((err, images)=>
    {
        if (err)
        {
          return console.log(err)
        }
        
          imgl=images;
          return res.json(images)
        
    }) 
    //await Image.deleteMany();
    //res.send('<h1>It seems to be working</h1>') */
    //res.json(imgl);
})

app.post('/profile', upload.single('photo'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    console.log(req.file.filename)
    const tempimg=new Image({title: req.file.filename, url: 'http://localhost:5000/static/'+req.file.filename});
    tempimg.save();
    res.send(req.file);
  })
  

app.listen(port, ()=>
{
    console.log("The server is up and running on port "+ port)
})