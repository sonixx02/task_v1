import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { getAllUsers, deleteUser, adminGetAllRoutines, adminCreateRoutine, adminDeleteRoutine } from "../../services/api";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newRoutine, setNewRoutine] = useState({
    name: "",
    duration: "",
    steps: [{ week: "1", description: "" }],
    benefits: [{ week: "1", benefit: "" }]
  });
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const userData = await getAllUsers(token);
        if (!Array.isArray(userData)) throw new Error("Invalid user data format");
        setUsers(userData);

        const routineData = await adminGetAllRoutines(token);
        if (!Array.isArray(routineData)) throw new Error("Invalid routine data format");
        console.log("Fetched routines:", routineData);
        
        setRoutines(routineData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setError(error.message || "Failed to fetch data");
        setLoading(false);

        if (error.message.includes("401")) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    fetchData();
  }, [token, navigate]);

  const handleDeleteUser = async (userId) => {
    try {
      setActionLoading(true);
      await deleteUser(userId, token);
      setUsers(users.filter((user) => user._id !== userId));
      setSuccessMessage("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user", error);
      setError("Failed to delete user");
    } finally {
      setActionLoading(false);
    }
  };

  const addStep = () => {
    setNewRoutine(prev => ({
      ...prev,
      steps: [...prev.steps, { week: String(prev.steps.length + 1), description: "" }]
    }));
  };

  const addBenefit = () => {
    setNewRoutine(prev => ({
      ...prev,
      benefits: [...prev.benefits, { week: String(prev.benefits.length + 1), benefit: "" }]
    }));
  };

  const handleStepChange = (index, field, value) => {
    setNewRoutine(prev => ({
      ...prev,
      steps: prev.steps.map((step, i) => 
        i === index ? { ...step, [field]: value } : step
      )
    }));
  };

  const handleBenefitChange = (index, field, value) => {
    setNewRoutine(prev => ({
      ...prev,
      benefits: prev.benefits.map((benefit, i) => 
        i === index ? { ...benefit, [field]: value } : benefit
      )
    }));
  };

  const handleCreateRoutine = async () => {
    try {
      setActionLoading(true);
      const formattedRoutine = {
        ...newRoutine,
        duration: parseInt(newRoutine.duration),
        steps: newRoutine.steps.map(step => ({
          ...step,
          week: parseInt(step.week)
        })),
        benefits: newRoutine.benefits.map(benefit => ({
          ...benefit,
          week: parseInt(benefit.week)
        }))
      };
      
      console.log("Creating routine:", formattedRoutine);
      const createdRoutine = await adminCreateRoutine(formattedRoutine, token);
      console.log("Created routine:", createdRoutine);
      
      setRoutines(prevRoutines => [...prevRoutines, createdRoutine]);
      setNewRoutine({
        name: "",
        duration: "",
        steps: [{ week: "1", description: "" }],
        benefits: [{ week: "1", benefit: "" }]
      });
      setModalOpen(false);
      setSuccessMessage("Routine created successfully!");
    } catch (error) {
      console.error("Error creating routine:", error);
      setError("Failed to create routine");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteRoutine = async (routineId) => {
    try {
      setActionLoading(true);
      await adminDeleteRoutine(routineId, token);
      setRoutines((prevRoutines) => prevRoutines.filter((routine) => routine._id !== routineId));
      setSuccessMessage("Routine deleted successfully!");
    } catch (error) {
      console.error("Error deleting routine", error);
      setError("Failed to delete routine");
    } finally {
      setActionLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <Button variant="destructive" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 border border-green-400 rounded">
          <strong>Success:</strong> {successMessage}
        </div>
      )}

      {/* Users Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
        {loading ? (
          <div className="text-center text-gray-700">Loading...</div>
        ) : (
          <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left text-gray-700">Username</th>
                <th className="py-2 px-4 text-left text-gray-700">Email</th>
                <th className="py-2 px-4 text-left text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t border-gray-200">
                  <td className="py-2 px-4">{user.username}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteUser(user._id)}
                      disabled={actionLoading}
                    >
                      {actionLoading ? "Deleting..." : "Delete"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Routines Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Manage Routines</h2>
        {loading ? (
          <div className="text-center text-gray-700">Loading...</div>
        ) : (
          <>
            <div className="mb-4 flex justify-end">
              <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogTrigger asChild>
                  <Button>Create New Routine</Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Routine</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Input
                     className="text-gray-900"
                      placeholder="Routine Name"
                      value={newRoutine.name}
                      onChange={(e) => setNewRoutine({ ...newRoutine, name: e.target.value })}
                    />
                    <Input
                     className="text-gray-900"
                      type="number"
                      placeholder="Duration (weeks)"
                      value={newRoutine.duration}
                      onChange={(e) => setNewRoutine({ ...newRoutine, duration: e.target.value })}
                      min="1"
                    />
                    
                    {/* Steps Section */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Steps</h3>
                        <Button  className="bg-blue-600 text-white hover:bg-blue-700" type="button" onClick={addStep} variant="outline" size="sm">
                          Add Step
                        </Button>
                      </div>
                      {newRoutine.steps.map((step, index) => (
                        <div key={`step-${step.week}-${index}`} className="grid grid-cols-2 gap-2">
                          <Input
                           className="text-gray-900"
                            type="number"
                            placeholder="Week"
                            value={step.week}
                            onChange={(e) => handleStepChange(index, 'week', e.target.value)}
                            min="1"
                          />
                          <Input
                           className="text-gray-900"
                            placeholder="Step Description"
                            value={step.description}
                            onChange={(e) => handleStepChange(index, 'description', e.target.value)}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Benefits Section */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Benefits</h3>
                        <Button   className="bg-blue-600 text-white hover:bg-blue-700"  type="button" onClick={addBenefit} variant="outline" size="sm">
                          Add Benefit
                        </Button>
                      </div>
                      {newRoutine.benefits.map((benefit, index) => (
                        <div key={index} className="grid grid-cols-2 gap-2">
                          <Input
                           className="text-gray-900"
                            type="number"
                            placeholder="Week"
                            value={benefit.week}
                            onChange={(e) => handleBenefitChange(index, 'week', e.target.value)}
                            min="1"
                          />
                          <Input
                           className="text-gray-900"
                            placeholder="Benefit Description"
                            value={benefit.benefit}
                            onChange={(e) => handleBenefitChange(index, 'benefit', e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button   className="bg-blue-600 text-white hover:bg-blue-700"  variant="outline" onClick={() => setModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button   className="bg-blue-600 text-white hover:bg-blue-700"  onClick={handleCreateRoutine} disabled={actionLoading}>
                      {actionLoading ? "Creating..." : "Create"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 text-left text-gray-700">Routine Name</th>
                  <th className="py-2 px-4 text-left text-gray-700">Duration (Weeks)</th>
                  <th className="py-2 px-4 text-left text-gray-700">Steps</th>
                  <th className="py-2 px-4 text-left text-gray-700">Benefits</th>
                  <th className="py-2 px-4 text-left text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {routines.map((routine) => (
                  <tr key={routine._id} className="border-t border-gray-200">
                    <td className="py-2 px-4">{routine.name}</td>
                    <td className="py-2 px-4">{routine.duration}</td>
                    <td className="py-2 px-4">
                      <ul className="list-disc ml-4">
                        {routine.steps && routine.steps.length > 0 ? (
                          routine.steps.map((step, index) => (
                            <li key={index}>
                              Week {step.week}: {step.description}
                            </li>
                          ))
                        ) : (
                          <li>No steps available</li>
                        )}
                      </ul>
                    </td>
                    <td className="py-2 px-4">
                      <ul className="list-disc ml-4">
                        {routine.benefits && routine.benefits.length > 0 ? (
                          routine.benefits.map((benefit, index) => (
                            <li key={index}>
                              Week {benefit.week}: {benefit.benefit}
                            </li>
                          ))
                        ) : (
                          <li>No benefits available</li>
                        )}
                      </ul>
                    </td>
                    <td className="py-2 px-4">
                      <Button
                        variant="destructive"
                        onClick={() => handleDeleteRoutine(routine._id)}
                        disabled={actionLoading}
                      >
                        {actionLoading ? "Deleting..." : "Delete"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;