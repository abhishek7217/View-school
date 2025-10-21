
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const useLocal = process.env.NEXT_PUBLIC_USE_LOCAL_UPLOAD === "true";

  const onSubmit = async (data) => {
    try {
      setMessage("");
      setLoading(true);

      let imageUrl = "";

      if (data.image && data.image[0]) {
        const formData = new FormData();
        formData.append("image", data.image[0]);

        if (useLocal) {
          const uploadRes = await axios.post("/api/upload-local", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          imageUrl = uploadRes.data.url;
        } else {
          const uploadRes = await axios.post("/api/upload-cloudinary", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          imageUrl = uploadRes.data.url;
        }
      }

      const payload = {
        name: data.name,
        address: data.address,
        city: data.city,
        state: data.state,
        contact: data.contact,
        image: imageUrl,
        email_id: data.email,
      };

      await axios.post("/api/schools", payload);

      setMessage("✅ School added successfully!");
      reset();
    } catch (err) {
      console.error("addSchool error:", err);
      setMessage("❌ Error: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Add School</h1>
        <Link href="/" style={{ color: "#06b6d4", textDecoration: "none" }}>← Home</Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: 12, maxWidth: 760 }}>
        <label>Name *</label>
        <input {...register("name", { required: "Name is required" })} />
        {errors.name && <div style={{ color: "red" }}>{errors.name.message}</div>}

        <label>Address</label>
        <textarea {...register("address")} rows={3} />

        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <label>City</label>
            <input {...register("city")} />
          </div>
          <div style={{ width: 180 }}>
            <label>State</label>
            <input {...register("state")} />
          </div>
        </div>

        <label>Contact</label>
        <input {...register("contact", { pattern: { value: /^[0-9]{7,15}$/, message: "Invalid phone" } })} />
        {errors.contact && <div style={{ color: "red" }}>{errors.contact.message}</div>}

        <label>Email</label>
        <input {...register("email", { pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" } })} />
        {errors.email && <div style={{ color: "red" }}>{errors.email.message}</div>}

        <label>Image (optional)</label>
        <input type="file" accept="image/*" {...register("image")} />

        <div style={{ marginTop: 12 }}>
          <button type="submit" disabled={loading}>{loading ? "Saving..." : "Add School"}</button>
        </div>
      </form>

      {message && <p style={{ marginTop: 12 }}>{message}</p>}
    </div>
  );
}
