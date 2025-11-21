import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { uploadService } from "../../services/upload.service";
import { validateFile } from "../../utils/validators";
import toast from "react-hot-toast";

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (resumeUrl: string, coverLetter: string) => void;
  jobTitle: string;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  jobTitle,
}) => {
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const error = validateFile(file);
      if (error) {
        toast.error(error);
        return;
      }
      setResumeFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resumeFile) {
      toast.error("Please upload your resume");
      return;
    }

    try {
      setUploading(true);
      const resumeUrl = await uploadService.uploadFile(resumeFile);
      await onSubmit(resumeUrl, coverLetter);
      toast.success("Application submitted successfully!");
      onClose();
      setCoverLetter("");
      setResumeFile(null);
    } catch (error: any) {
      toast.error(error.message || "Failed to submit application");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Apply to ${jobTitle}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Resume (PDF only, max 5MB)
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
            required
          />
          {resumeFile && (
            <p className="mt-2 text-sm text-gray-600">
              Selected: {resumeFile.name}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cover Letter (Optional)
          </label>
          <textarea
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Tell us why you're a great fit for this role..."
          />
        </div>

        <div className="flex space-x-3 pt-4">
          <Button type="submit" loading={uploading} className="flex-1">
            Submit Application
          </Button>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};
