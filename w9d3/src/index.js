// config/env.js
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

// Determine which .env file to load
const envFile = `.env.${process.env.NODE_ENV || 'dev'}`;
const envPath = path.resolve(process.cwd(), envFile);

dotenv.config({ path: envPath });

// Fallback to .env if environment-specific file doesn't exist
if (!fs.existsSync(envPath)) {
    dotenv.config();
}

import express from 'express';
import router from './routes/index.js';
const app = express();
import connectDB from './config/database.js';
// import multer from 'multer'

// import cloudinary from 'cloudinary'
// import multerS3 from 'multer-s3';

console.log(`Sample: ${process.env.SAMPLE}`)

// aws.config.update({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: process.env.AWS_REGION
// });

// Configure AWS



// const storage = multer.diskStorage({
//     // Destination folder
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         // Generate unique filename: timestamp-randomstring.extension
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//     }
// })




connectDB()

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET,
// });
// async function handleUpload(file) {
//     const res = await cloudinary.uploader.upload(file, {
//         resource_type: "auto",
//     });
//     return res;
// }

app.use(express.json());

// app.post('/upload-signle', uploads.single('file'), (req, res) => {
//     console.log(req.file);  // File information
//     console.log(req.body);  // Other form fields

//     res.json({
//         message: 'File uploaded successfully',
//         file: req.file
//     });
// })

// app.post('/upload-multiple', uploads.array('file', 5), (req, res) => {
//     console.log(req.files);  // Array of files

//     res.json({
//         message: `${req.files.length} files uploaded successfully`,
//         files: req.files.map(f => ({
//             filename: f.filename,
//             size: f.size,
//             mimetype: f.mimetype
//         }))
//     });
// })

// app.post('/upload-fields', uploads.fields([
//     { name: 'file', maxCount: 4 },
//     { name: 'photos', maxCount: 4 }
// ]), (req, res) => {
//     console.log(req.files.file[0]);  // Avatar file
//     console.log(req.files.photos[0]);   // Cover file

//     res.json({
//         message: 'Files uploaded',
//         file: req.files.file[0].filename,
//         photos: req.files.photos[0].filename
//     });
// })

// app.post('/cloud-upload', uploads.single("my_file"), async (req, res) => {
//     try {
//         const b64 = Buffer.from(req.file.buffer).toString("base64");
//         let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
//         const cldRes = await handleUpload(dataURI);
//         res.json(cldRes);
//     } catch (error) {
//         console.log(error);
//         res.send({
//             message: error.message,
//         });
//     }
// })

// app.use('/uploads', express.static('uploads', {
//     maxAge: '1d',           // Cache for 1 day
//     index: false,           // Don't serve index.html
//     dotfiles: 'ignore',     // Ignore dotfiles
//     etag: true              // Enable ETag
// }));

// Use in route
// app.post('/upload-s3', uploadS3.single('image'), async (req, res) => {
//     try {

//     } catch (err) {
//         console.error(err)
//         return res.status(500).json({ error: "Upload filed" })
//     }
// });

app.use('/api', router)

app.use((err, req, res, next) => {
    res.status(500).json({
        success: false,
        error: err.message
    });
});

app.listen(3000, () => {
    console.log('Server W9 D3 running on port 3000');
});