import React from 'react';
import { ListTodo, Plus, Search, Pencil, Trash2, CheckCircle, Circle } from 'lucide-react';

const priorityColors = {
  high: 'bg-red-100 text-red-800 border-red-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  low: 'bg-green-100 text-green-800 border-green-200',
};

export function TaskCard({ task, onDelete, onEdit, onStatusChange }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition-transform transform hover:scale-105 border border-gray-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onStatusChange(task._id, task.status === 'completed' ? 'pending' : 'completed')}
              className={`text-gray-500 hover:text-blue-600 transition-colors ${
                task.status === 'completed' ? 'text-green-500' : ''
              }`}
            >
              {task.status === 'completed' ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                <Circle className="w-6 h-6" />
              )}
            </button>
            <h3 className={`text-lg font-bold tracking-wide ${task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-800'}`}>
              {task.title}
            </h3>
          </div>
          <p className="mt-3 text-gray-600 italic leading-relaxed">{task.description}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <span className={`px-4 py-1 rounded-full text-sm font-medium border ${priorityColors[task.priority]} shadow-sm`}> 
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
            <span className="bg-pink-200 text-pink-900 px-4 py-1 rounded-full text-sm font-medium border border-pink-300 shadow-sm">
              {task.category}
            </span>
            <span className="bg-blue-200 text-blue-900 px-4 py-1 rounded-full text-sm font-medium border border-blue-300 shadow-sm">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="flex gap-3 ml-6">
          <button
            onClick={() => onEdit(task)}
            className="text-gray-500 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-100 shadow-md"
          >
            <Pencil className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="text-gray-500 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-100 shadow-md"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
