"use client";
import React, { useState } from "react";
import Image from "next/image";
import useDrivePicker from 'react-google-drive-picker';

export function AutomationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [mediaType, setMediaType] = useState("video");
  const [openPicker, authResponse] = useDrivePicker(); 

  const [formData, setFormData] = useState({
    mediaURL: "",
    description: "",
    tone: "casual",
    platform: "instagram",
    fileName: "" 
  });

  const handlePickFormDrive = () => {
    openPicker({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "", 
      developerKey: process.env.NEXT_PUBLIC_GOOGLE_VIEW_ID || "",
      viewId: mediaType === "video" ? "DOCS_VIDEOS" : "DOCS_IMAGES", 
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: false,
      callbackFunction: (data) => {
        if (data.action === 'cancel') {
          console.log('User clicked cancel/close button');
        }
        if (data.docs && data.docs.length > 0) {
          const file = data.docs[0];
          setFormData({
            ...formData,
            mediaURL: file.url, 
            fileName: file.name
          });
        }
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        description: formData.description,
        tone: formData.tone,
        platform: formData.platform,
        ...(mediaType === "image" 
          ? { image_url: formData.mediaURL }
          : { video_url: formData.mediaURL }
        )
      };

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        alert("🚀 Content generated successfully!");
        setFormData({ mediaURL: "", description: "", tone: "casual", platform: "instagram", fileName: "" });
      } else {
        alert("❌ Failed to generate content. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* TABS SELECTOR */}
      <div className="flex gap-4 p-1 bg-slate-100 rounded-2xl w-fit">
        <button
          type="button"
          onClick={() => {
            setMediaType("video");
            setFormData({...formData,mediaURL: "", fileName: ""})
          }}
          className={`px-6 py-2 rounded-xl text-sm font-bold transition ${mediaType === 'video' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
        >
          🎬 Video
        </button>

        <button
          type="button"
          onClick={() => {
            setMediaType("image");
            setFormData({...formData,mediaURL: "", fileName: ""})
          }}
          className={`px-6 py-2 rounded-xl text-sm font-bold transition ${mediaType === 'image' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
        >
          🖼️ Gambar
        </button>
      </div>

      {/* INPUT LINK & PICKER */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Bahan {mediaType === 'video' ? 'Video' : 'Gambar'}
        </label>
        <div className="relative group">
          <input
            type="url"
            required
            className="w-full pl-4 pr-36 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            placeholder={`Masukkan link atau pilih file...`}
            value={formData.mediaURL}
            onChange={(e) => setFormData({ ...formData, mediaURL: e.target.value })}
          />
          <button
            type="button"
            onClick={handlePickFormDrive}
            className="absolute right-2 top-2 bottom-2 px-4 bg-slate-800 text-white text-[11px] font-bold rounded-xl hover:bg-slate-700 transition flex items-center gap-2"
          >
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg"
              width={16}
              height={16}
              alt="GDrive"
            />
            Pilih Drive
          </button>
        </div>
        {formData.fileName && (
          <p className="text-xs text-indigo-600 mt-2 font-medium">
            ✅ Terpilih: {formData.fileName}
          </p>
        )}
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Deskripsi Produk
        </label>
        <textarea
          required
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
          placeholder="Jelaskan detail produk untuk membantu AI..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      {/* OPTIONS */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Gaya Bahasa AI</label>
          <select
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white outline-none"
            value={formData.tone}
            onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
          >
            <option value="casual">Santai & Akrab</option>
            <option value="professional">Profesional</option>
            <option value="hard-sell">Hard Sell</option>
            <option value="storytelling">Storytelling</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Target Posting</label>
          <select
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white outline-none"
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
          >
            <option value="tiktok">TikTok</option>
            <option value="instagram">Instagram Reels</option>
            <option value="facebook">Facebook Reels</option>
          </select>
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all transform active:scale-95 ${
          isLoading ? "bg-slate-400 cursor-not-allowed" : "bg-gradient-to-r from-indigo-600 to-blue-600 hover:opacity-90 shadow-indigo-200"
        }`}
      >
        {isLoading ? "Memproses Data..." : "🚀 Mulai Generasi Konten"}
      </button>
    </form>
  );
}