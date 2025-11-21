import { api } from "./api";
import { ApiResponse, CloudinaryUploadData } from "../types";
import axios from "axios";

export const uploadService = {
  getUploadSignature: async (
    filename: string,
    size: number,
  ): Promise<CloudinaryUploadData> => {
    const response = await api.post<ApiResponse<CloudinaryUploadData>>(
      "/uploads/signature",
      {
        filename,
        mimeType: "application/pdf",
        size,
      },
    );
    return response.data.data!;
  },
  uploadFile: async (file: File): Promise<string> => {
    // Client-side validation (unchanged)
    if (file.type !== "application/pdf") {
      throw new Error("Only PDF files are allowed");
    }
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error("File size must not exceed 5MB");
    }

    // Get signed data from backend
    const uploadData = await uploadService.getUploadSignature(
      file.name,
      file.size,
    );

    // Build FormData: Match paramsToSign exactly
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", uploadData.apiKey);
    formData.append("timestamp", uploadData.timestamp.toString());
    formData.append("signature", uploadData.signature);
    formData.append("folder", uploadData.folder);
    formData.append("public_id", uploadData.publicId);
    formData.append("resource_type", "raw"); // Required for PDF, but NOT signed
    formData.append("use_filename", "true"); // String representation of boolean
    formData.append("unique_filename", "false");

    // Upload URL: Include /raw/ for PDFs
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${uploadData.cloudName}/raw/upload`;

    const response = await axios.post(cloudinaryUrl, formData, {
      headers: { "Content-Type": "multipart/form-data" }, // Axios sets this automatically, but explicit is fine
    });

    return response.data.secure_url;
  },
};
