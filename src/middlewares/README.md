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
