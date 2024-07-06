const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const path = require('path')

const PORT = process.env.PORT || 5000
const app = express()

app.use('/', express.static(path.join(__dirname, 'public')))

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(fileUpload())

const fileRoutes = require('./routes/files')
app.use('/files', fileRoutes)

const connectionString = process.env.ATLAS_URI
mongoose
  .connect(connectionString, {
    dbName: 'uploader-files-app',
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error.message)
  })
