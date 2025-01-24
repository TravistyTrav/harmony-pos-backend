const multer = require('multer');
const admin = require('firebase-admin');
const { getStorage } = require('firebase-admin/storage');

admin.initializeApp({
  storageBucket: 'harmony-dbe01.firebasestorage.app',
});

const upload = multer({ storage: multer.memoryStorage() });

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const bucket = getStorage().bucket();
    const file = bucket.file(`products/${req.file.originalname}`);
    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    stream.on('error', (error) => {
      console.error(error);
      res.status(500).send('Upload error');
    });

    stream.on('finish', async () => {
      await file.makePublic(); // Make the file public if needed
      const url = file.publicUrl();
      res.status(200).json({ url });
    });

    stream.end(req.file.buffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Upload failed');
  }
});
