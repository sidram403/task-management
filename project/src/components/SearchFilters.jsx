import React from 'react';
import { ListTodo, Plus, Search } from 'lucide-react';

export function Header({ onNewTask }) {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3 hover:scale-105 transition-transform">
            <ListTodo className="h-10 w-10 text-white drop-shadow-lg" />
            <h1 className="text-3xl font-extrabold text-white tracking-wide">Task Manager</h1>
          </div>
          <button
            onClick={onNewTask}
            className="inline-flex items-center px-5 py-3 rounded-full shadow-md text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition-all transform hover:scale-110"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Task
          </button>
        </div>
      </div>
    </header>
  );
}

export function SearchFilters({ searchTerm, setSearchTerm, filterCategory, setFilterCategory, filterStatus, setFilterStatus, categories }) {
  return (
    <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 rounded-2xl shadow-2xl p-8 mb-8 border border-gray-300">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Filter Tasks</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none pl-10 w-full rounded-xl border-purple-300 shadow-lg focus:border-purple-500 focus:ring-purple-500 transition-all py-3 bg-white hover:bg-purple-50"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="outline-none rounded-xl border-pink-300 shadow-lg focus:border-pink-500 focus:ring-pink-500 transition-all py-3 bg-white hover:bg-pink-50"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="outline-none rounded-xl border-blue-300 shadow-lg focus:border-blue-500 focus:ring-blue-500 transition-all py-3 bg-white hover:bg-blue-50"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
} 
