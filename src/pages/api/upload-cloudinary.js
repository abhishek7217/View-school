
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

const upload = multer();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
});

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
      console.error("upload-cloudinary multer error:", err);
      return res.status(500).json({ error: err.message });
    }

    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "school_images" },
      (error, result) => {
        if (error) {
          console.error("cloudinary upload error:", error);
          return res.status(500).json({ error: error.message });
        }
        return res.status(200).json({ url: result.secure_url });
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
  });
}
