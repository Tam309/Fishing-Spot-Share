require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

const { userRouter } = require('./routes/user.js');
const { cloudinaryRouter } = require('./cloudinary/cloudinary.js')
const { postRouter } = require('./routes/post.js')
const { commentRouter } = require('./routes/comment.js')

const app = express()
app.use(cors())
app.use(express.json())
// app.use(express.json({ limit: '100mb' }));
// app.use(express.urlencoded({extended: true, limit: '100mb'}));
app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))

app.use('/',userRouter)
app.use('/',cloudinaryRouter)
app.use('/',postRouter)
app.use('/',commentRouter)


const port = process.env.PORT;

app.listen(port)


