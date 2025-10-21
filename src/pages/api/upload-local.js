
import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "./public/schoolImages";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  upload.single("image")(req, res, (err) => {
    if (err) {
      console.error("upload-local error:", err);
      return res.status(500).json({ error: err.message });
    }
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const url = `/schoolImages/${req.file.filename}`;
    return res.status(200).json({ url });
  });
}
