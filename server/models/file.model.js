const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FileSchema = new Schema({
  filename: {
    type: String,
    require: true,
  },
  originalName: {
    type: String,
    require: true,
  },
  size: {
    type: String,
    require: true,
  },
  mimeType: {
    type: String,
    require: true,
  },
  path: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const File = mongoose.model('file', FileSchema)

module.exports = File
