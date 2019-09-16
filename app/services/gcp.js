const { Storage } = require('@google-cloud/storage')

const storage = new Storage()

const uploadFile = async (file, destination) => {
  const bucketName = process.env.GOOGLE_CLOUD_STORAGE_BUCKET
  await storage
    .bucket(bucketName)
    .file(destination)
    .createWriteStream({
      metadata: {
        contentType: file.mimetype
      },
      public: true
    })
    .on('error', error => console.error(error))
    .on('finish', () => console.info(`${file} uploaded to ${bucketName}.`))
    .end(file.buffer)

  return (
    'https://' +
    process.env.GOOGLE_CLOUD_STORAGE_BUCKET +
    '.storage.googleapis.com/' +
    destination
  )
}

module.exports = {
  uploadFile
}
