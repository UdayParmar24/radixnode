const app =require('express')();
// const bodyParser = require('body-parser');
const sequelize = require('./config/db_config');
const route = require('./routes/route');
const multer = require('multer');
const dotenv = require('dotenv');
dotenv.config();
// app.use(bodyParser.urlencoded({ extended: false }));


const destination = multer.diskStorage({
    // Specify the folder to save uploaded files to
    destination: function (req, file, cb) {
        cb(null, 'productImages')
    },
    filename: function (req, file, cb) {
        const datetimestamp = 'IMG_' + Date.now() + '-' + file.originalname;
        // Make sure you have a unique name for each file
        cb(null, datetimestamp.replace(' ','_'));
    }
});

const ff =(req,file,cb)=>{
    if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" ){
        cb(null,true);
    }else{
        return cb(new Error("Only image is allowed!"), false);
    }
}

app.use(multer({storage:destination,fileFilter:ff}).single('image'));
// app.use(bodyParser.json());
app.use(route);

const port = process.env.PROD_PORT;
sequelize

.sync()
.then(()=>{
    app.listen(port);
    console.log(`Server is running on ${port}`);
});
    