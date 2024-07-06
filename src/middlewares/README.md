##### Other way - src/middlewares/multer.middleware.js

```
import multer from "multer";
import path from "path";

// Define storage settings for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Upload files to the uploads/ directory
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext); // Set filename as fieldname-currenttimestamp.extension
    }
});

export const upload = multer({ storage: storage });
```

`console.log(req.files)`
```
{
    avatar: [
        {
            fieldname: 'avatar',
            originalname: 'vjay.jpeg',
            encoding: '7bit',
            mimetype: 'application/octet-stream',
            destination: './public/temp',
            filename: 'vjay.jpeg',
            path: 'public\\temp\\vjay.jpeg',
            size: 624
        }
    ],
    coverImage: [
        {
            fieldname: 'coverImage',
            originalname: 'vjay-cover.jpeg',
            encoding: '7bit',
            mimetype: 'application/octet-stream',
            destination: './public/temp',
            filename: 'vjjay-cover.jpeg',
            path: 'public\\temp\\vjjay-cover.jpeg',
            size: 624
        }
    ]
}
```
