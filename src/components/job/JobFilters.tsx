// JobFilters.tsx
import React from "react";
import { EmploymentType, JobFilters as JobFiltersType } from "../../types";
import { Input } from "../common/Input";
import { Button } from "../common/Button";

interface JobFiltersProps {
  filters: JobFiltersType;
  onFilterChange: (filters: JobFiltersType) => void;
  onReset: () => void;
}

export const JobFilters: React.FC<JobFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
}) => {
  const updateFilter = <K extends keyof JobFiltersType>(
    key: K,
    value: JobFiltersType[K],
  ) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>

      <div className="space-y-4">
        <Input
          label="Location"
          type="text"
          placeholder="e.g., San Francisco"
          value={filters.location || ""}
          onChange={(e) =>
            updateFilter("location", e.target.value || undefined)
          }
        />

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              checked={!!filters.isRemote}
              onChange={(e) => updateFilter("isRemote", e.target.checked)}
              className="mr-2 h-4 w-4"
            />
            Remote Only
          </label>
        </div>

        <Input
          label="Minimum Salary"
          type="number"
          placeholder="e.g., 80000"
          value={filters.salaryMin ?? ""}
          onChange={(e) => {
            const val = e.target.value;
            updateFilter("salaryMin", val ? parseInt(val) : undefined);
          }}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Employment Type
          </label>
          <select
            value={filters.employmentType || ""}
            onChange={(e) =>
              updateFilter(
                "employmentType",
                (e.target.value as EmploymentType) || undefined,
              )
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Types</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
        </div>

        <div className="flex space-x-2 pt-4">
          <Button
            type="button"
            onClick={() => onFilterChange(filters)} // Apply current
            className="flex-1"
          >
            Apply Filters
          </Button>
          <Button type="button" variant="secondary" onClick={onReset}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};
