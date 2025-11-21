import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { ErrorBoundary } from "./components/common/ErrorBoundary";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { JobListings } from "./pages/JobListings";
import { JobDetail } from "./pages/JobDetail";
import { CandidateDashboard } from "./pages/CandidateDashboard";
import { EmployerDashboard } from "./pages/EmployerDashboard";
import { CreateJob } from "./pages/CreateJob";
import { EditJob } from "./pages/EditJob"; // NEW
import { ApplicationManagement } from "./pages/ApplicationManagement";
import { Profile } from "./pages/Profile";

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/jobs" element={<JobListings />} />
                <Route path="/jobs/:id" element={<JobDetail />} />

                {/* Candidate Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute requiredRole="candidate">
                      <CandidateDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                {/* Employer Routes */}
                <Route
                  path="/employer/dashboard"
                  element={
                    <ProtectedRoute requiredRole="employer">
                      <EmployerDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/employer/jobs/new"
                  element={
                    <ProtectedRoute requiredRole="employer">
                      <CreateJob />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/employer/jobs/:jobId/edit"
                  element={
                    <ProtectedRoute requiredRole="employer">
                      <EditJob />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/employer/jobs/:jobId/applications"
                  element={
                    <ProtectedRoute requiredRole="employer">
                      <ApplicationManagement />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster position="top-right" />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
