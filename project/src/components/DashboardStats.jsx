import React from 'react';
import { ListTodo, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, bgGradient }) => (
  <div
    className={`rounded-2xl shadow-lg p-6 border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-2xl ${bgGradient} hover:border-opacity-70 hover:border-gray-400`}
  >
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-sm font-semibold text-white drop-shadow-md">{title}</h3>
        <p className={`mt-2 text-4xl font-bold ${color} drop-shadow-lg`}>{value}</p>
      </div>
      <div
        className={`flex items-center justify-center h-12 w-12 rounded-full bg-white shadow-lg`}
      >
        <Icon className={`h-6 w-6 ${color}`} />
      </div>
    </div>
  </div>
);

export function DashboardStats({ tasks }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === 'completed').length;
  const pendingTasks = totalTasks - completedTasks;
  const highPriorityTasks = tasks.filter((task) => task.priority === 'high').length;

  const stats = [
    {
      title: 'Total Tasks',
      value: totalTasks,
      icon: ListTodo,
      color: 'text-gray-900',
      bgGradient: 'bg-gradient-to-r from-blue-400 to-blue-600',
    },
    {
      title: 'Pending Tasks',
      value: pendingTasks,
      icon: Clock,
      color: 'text-yellow-600',
      bgGradient: 'bg-gradient-to-r from-yellow-300 to-yellow-500',
    },
    {
      title: 'Completed Tasks',
      value: completedTasks,
      icon: CheckCircle2,
      color: 'text-green-600',
      bgGradient: 'bg-gradient-to-r from-green-400 to-green-600',
    },
    {
      title: 'High Priority',
      value: highPriorityTasks,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgGradient: 'bg-gradient-to-r from-red-400 to-red-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}
