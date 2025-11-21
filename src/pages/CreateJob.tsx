import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";
import { jobService, CreateJobData } from "../services/job.service";
import { validateSalaryRange } from "../utils/validators";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

export const CreateJob: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateJobData>({
    title: "",
    description: "",
    location: "",
    isRemote: false,
    salary: { min: 0, max: 0, currency: "INR" },
    employmentType: "full-time",
    tags: [],
    companyLogoUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const salaryError = validateSalaryRange(
      formData.salary.min,
      formData.salary.max,
    );
    if (salaryError) {
      toast.error(salaryError);
      return;
    }

    setLoading(true);
    try {
      // Remove empty companyLogoUrl
      const dataToSend = { ...formData };
      if (!dataToSend.companyLogoUrl) {
        delete dataToSend.companyLogoUrl;
      }

      const job = await jobService.createJob(dataToSend);
      toast.success("Job posted successfully!");
      navigate(`/employer/jobs/${job._id}/applications`);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Post a New Job</h1>
        {user?.company && (
          <p className="text-gray-600 mt-2">
            Posting as: <span className="font-semibold">{user.company}</span>
          </p>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-sm border p-8 space-y-6"
      >
        <Input
          label="Job Title"
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          placeholder="e.g., Senior Software Engineer"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={8}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            placeholder="Describe the role, responsibilities, and requirements..."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label="Location"
            type="text"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            required
            placeholder="e.g., Mumbai, Maharashtra"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Employment Type
            </label>
            <select
              value={formData.employmentType}
              onChange={(e) =>
                setFormData({ ...formData, employmentType: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label="Minimum Salary (INR/year)"
            type="number"
            value={formData.salary.min || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                salary: {
                  ...formData.salary,
                  min: parseInt(e.target.value) || 0,
                },
              })
            }
            required
            placeholder="500000"
          />

          <Input
            label="Maximum Salary (INR/year)"
            type="number"
            value={formData.salary.max || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                salary: {
                  ...formData.salary,
                  max: parseInt(e.target.value) || 0,
                },
              })
            }
            required
            placeholder="1200000"
          />
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.isRemote}
              onChange={(e) =>
                setFormData({ ...formData, isRemote: e.target.checked })
              }
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Remote Position
            </span>
          </label>
        </div>

        <Input
          label="Tags (comma-separated)"
          type="text"
          placeholder="React, TypeScript, Node.js"
          onChange={(e) =>
            setFormData({
              ...formData,
              tags: e.target.value
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean),
            })
          }
        />

        <Input
          label="Company Logo URL (Optional)"
          type="url"
          value={formData.companyLogoUrl || ""}
          onChange={(e) =>
            setFormData({ ...formData, companyLogoUrl: e.target.value })
          }
          placeholder="https://example.com/logo.png"
        />

        <div className="flex space-x-4 pt-4">
          <Button type="submit" loading={loading} className="flex-1">
            Post Job
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/employer/dashboard")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
