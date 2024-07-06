const express = require('express')
const router = express.Router()

const { getFiles, uploadFile, deleteFile } = require('../controllers/files')

router.get('/', getFiles)
router.post('/upload', uploadFile)
router.delete('/delete/:id', deleteFile)

module.exports = router
