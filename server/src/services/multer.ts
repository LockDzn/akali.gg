import multer from 'multer'
import createError from 'http-errors'

const config: multer.Options = {
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png']

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(createError(400, `Invalid file type.`))
    }
  },
}

export { config, multer }
