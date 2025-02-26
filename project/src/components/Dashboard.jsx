// src/components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { Header } from "./Header";
import { SearchFilters } from "./SearchFilters";
import { TaskList } from "./TaskList";
import { TaskForm } from "./TaskForm";
import { Modal } from "./Modal";
import { DashboardStats } from "./DashboardStats";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../lib/axiosInstance";
import { toast } from "react-hot-toast";

export const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const { user, logout } = useAuth();
  console.log(user);

  const fetchAllTasks = async () => {
    try {
      const res = await axiosInstance.get(`/task/all/${user.userId}`);
      setTasks(res.data);
      console.log("tasks", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, [user]);

  const handleCreateTask = async (taskData) => {
    try {
      await axiosInstance.post("/task/create", taskData);
      
      setShowTaskForm(false);
      fetchAllTasks();
      toast.success("Task created successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Task creation failed! Please try again.");
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      if (!editingTask) return;

      const res = await axiosInstance.put(
        `/task/update/${editingTask._id}`,
        taskData
      );
      
      setEditingTask(null);
      fetchAllTasks();
      toast.success("Task updated successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Task updation failed! Please try again.");
    }
  };

  const handleDeleteTask = async (id) => {
    setTasks(tasks.filter((task) => task._id !== id));
    try {
      const res = await axiosInstance.delete(`/task/delete/${id}`);
      fetchAllTasks();
      toast.success("Task deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Task delete failed! Please try again.");
    }
  };

  const handleStatusChange = async (id, status) => {
   
    
    try {
      // const updatedTasks = tasks.map((task) =>
      //   task._id === id ? { ...task, status } : task
      // );
      const taskStatusUpdated ={
        status: status
      }
      const res = await axiosInstance.put(
        `/task/update-status/${id}`,
        taskStatusUpdated
      );
      fetchAllTasks();
      toast.success("Task status changed successfully!");
      // setTasks(updatedTasks);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Task status updation failed! Please try again.");
    }
    
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || task.category === filterCategory;
    const matchesStatus =
      filterStatus === "all" || task.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = Array.from(new Set(tasks.map((task) => task.category)));

  const handleCloseModal = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const handleLogout = async () => {
    try {
      // Redirect to Sign-in page
      await logout();
      toast.success("Logout successful! Redirecting to sign in...");
      setTimeout(() => navigate("/signin"), 2000);
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Logout failed! Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header onNewTask={() => setShowTaskForm(true)} onLogout={handleLogout} userName={user.username} />

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <DashboardStats tasks={tasks} />

        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          categories={categories}
        />

        <TaskList
          tasks={filteredTasks}
          onDelete={handleDeleteTask}
          onEdit={setEditingTask}
          onStatusChange={handleStatusChange}
        />

        <Modal
          isOpen={showTaskForm || editingTask}
          onClose={handleCloseModal}
          title={editingTask ? "Edit Task" : "Create New Task"}
        >
          <TaskForm
            onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
            initialData={editingTask}
            onCancel={handleCloseModal}
          />
        </Modal>
      </main>
    </div>
  );
};
