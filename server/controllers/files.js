const File = require('../models/file.model')
const path = require('path')
const fs = require('fs').promises

const uploadFile = async (req, res) => {
  try {
    const file = req.files.file
    const filename = Date.now() + path.extname(file.name)
    const uploadPath = path.join(
      __dirname,
      '..',
      '..',
      'client',
      'public',
      'uploads',
      filename
    )

    await file.mv(uploadPath)

    const newFile = {
      filename,
      originalName: file.name,
      size: file.size,
      mimeType: file.mimetype,
      path: `uploads/${filename}`,
    }

    await File.create(newFile)

    return res.status(200).json({ msg: 'Files uploaded successfully!' })
  } catch (error) {
    return res.status(500).json(error)
  }
}

const deleteFile = async (req, res) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ msg: 'User ID required' })
  }

  const file = await File.findById(id)

  if (!file) {
    return res.status(400).json({ message: 'File not found' })
  }

  const deletePath = path.join(
    __dirname,
    '..',
    '..',
    'client',
    'public',
    'uploads',
    file.filename
  )

  await fs.unlink(deletePath)

  const result = await file.deleteOne()

  const reply = `File ${file.originalName} with ID ${file._id} deleted`

  return res.status(200).json({ msg: reply })
}

const getFiles = async (req, res) => {
  const files = await File.find().find().sort({ createdAt: -1 })

  if (!files || !files.length || !Array.isArray(files)) {
    return res.status(400).json({ msg: 'No files found' })
  }

  res.status(200).json(files)
}

module.exports = { getFiles, uploadFile, deleteFile }
