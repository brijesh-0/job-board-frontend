import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/common/Input";
import { Button } from "../components/common/Button";

export const Landing: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/jobs?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Find Your Next Opportunity
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Discover thousands of job opportunities from top companies
          </p>

          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex space-x-4">
              <Input
                type="text"
                placeholder="Search jobs by title, company, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="lg">
                Search Jobs
              </Button>
            </div>
          </form>

          <div className="mt-8 flex justify-center space-x-4">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-white border border-gray-200">
              🏢 Remote Jobs
            </span>
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-white border border-gray-200">
              💼 Full-time
            </span>
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-white border border-gray-200">
              🚀 Startups
            </span>
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">Search Jobs</h3>
            <p className="text-gray-600">
              Browse thousands of job listings from top companies
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">Apply Easily</h3>
            <p className="text-gray-600">
              Submit your application with just a few clicks
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p className="text-gray-600">
              Monitor your applications through every stage
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
