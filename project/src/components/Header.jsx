import React, { useState } from "react";
import { ListTodo, Plus, LogOut, Menu, User } from "lucide-react";

export function Header({ onNewTask, onLogout, userName }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-3 hover:scale-105 transition-transform">
            <ListTodo className="h-10 w-10 text-white drop-shadow-lg" />
            <h1 className="text-3xl font-extrabold text-white tracking-wide">
              Task Manager
            </h1>
          </div>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center space-x-6">
            {/* Welcome Message */}
            <div className="flex items-center space-x-2 text-white font-semibold">
              <User className="h-6 w-6" />
              <span className="text-lg">Welcome, {userName}!</span>
            </div>

            <button
              onClick={onNewTask}
              className="flex items-center px-5 py-2 rounded-full shadow-md text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition-all transform hover:scale-110"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Task
            </button>
            <button
              onClick={onLogout}
              className="flex items-center px-5 py-2 rounded-full shadow-md text-sm font-semibold text-white bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all transform hover:scale-110"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="sm:hidden text-white focus:outline-none" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-8 w-8" />
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="sm:hidden flex flex-col items-center mt-4 space-y-3">
            {/* Welcome Message */}
            <div className="flex items-center space-x-2 text-white font-semibold">
              <User className="h-6 w-6" />
              <span className="text-lg">Welcome, {userName}!</span>
            </div>

            <button
              onClick={onNewTask}
              className="w-full text-center px-5 py-2 rounded-lg shadow-md text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all"
            >
              <Plus className="h-5 w-5 inline mr-2" />
              New Task
            </button>
            <button
              onClick={onLogout}
              className="w-full text-center px-5 py-2 rounded-lg shadow-md text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-all"
            >
              <LogOut className="h-5 w-5 inline mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
