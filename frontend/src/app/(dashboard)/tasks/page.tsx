'use client';

import { useState } from 'react';
import PageBreadcrumb from '@/components/dashboard/common/PageBreadcrumb';
import Breadcrumbs from '@/components/ui/breadcrumbs/Breadcrumbs';
import Button from '@/components/ui/button/Button';
import ButtonGroup from '@/components/ui/button/ButtonGroup';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card/Card';
import Select from '@/components/ui/dropdown/Select';
import Menu from '@/components/ui/dropdown/Menu';
import Spinner from '@/components/ui/loading/Spinner';
import Tooltip from '@/components/ui/tooltip/Tooltip';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  createdAt: string;
}

const statusOptions = [
  { value: 'todo', label: '📋 To Do', icon: '📋' },
  { value: 'in-progress', label: '⚡ In Progress', icon: '⚡' },
  { value: 'completed', label: '✅ Completed', icon: '✅' }
];

const priorityOptions = [
  { value: 'low', label: '🟢 Low', icon: '🟢' },
  { value: 'medium', label: '🟡 Medium', icon: '🟡' },
  { value: 'high', label: '🔴 High', icon: '🔴' }
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Setup project database',
      description: 'Configure PostgreSQL database and run initial migrations',
      status: 'completed',
      priority: 'high',
      dueDate: '2024-01-15',
      createdAt: '2024-01-10'
    },
    {
      id: '2',
      title: 'Implement user authentication',
      description: 'Add login, register, and password reset functionality',
      status: 'in-progress',
      priority: 'high',
      dueDate: '2024-01-20',
      createdAt: '2024-01-12'
    },
    {
      id: '3',
      title: 'Design landing page',
      description: 'Create wireframes and mockups for the homepage',
      status: 'todo',
      priority: 'medium',
      dueDate: '2024-01-25',
      createdAt: '2024-01-14'
    },
    {
      id: '4',
      title: 'Write API documentation',
      description: 'Document all API endpoints using OpenAPI specification',
      status: 'todo',
      priority: 'low',
      dueDate: '2024-01-30',
      createdAt: '2024-01-15'
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'todo' as Task['status'],
    priority: 'medium' as Task['priority'],
    dueDate: ''
  });

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard', icon: '🏠' },
    { label: 'Tasks' }
  ];

  const filteredTasks = tasks.filter(task => {
    const statusMatch = !filterStatus || task.status === filterStatus;
    const priorityMatch = !filterPriority || task.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  const tasksByStatus = {
    todo: filteredTasks.filter(task => task.status === 'todo'),
    'in-progress': filteredTasks.filter(task => task.status === 'in-progress'),
    completed: filteredTasks.filter(task => task.status === 'completed')
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const task: Task = {
      id: Date.now().toString(),
      ...newTask,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setTasks(prev => [task, ...prev]);
    setNewTask({
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      dueDate: ''
    });
    setShowAddForm(false);
    setIsLoading(false);
  };

  const handleStatusChange = async (taskId: string, newStatus: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status: newStatus as Task['status'] }
        : task
    ));
    setIsLoading(false);
  };

  const handleDeleteTask = async (taskId: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setTasks(prev => prev.filter(task => task.id !== taskId));
    setIsLoading(false);
  };

  const getTaskActions = (task: Task) => [
    {
      id: 'edit',
      label: 'Edit Task',
      icon: '✏️',
      onClick: () => console.log('Edit task:', task.id)
    },
    {
      id: 'duplicate',
      label: 'Duplicate',
      icon: '📋',
      onClick: () => console.log('Duplicate task:', task.id)
    },
    { id: 'separator1', label: '', separator: true },
    {
      id: 'delete',
      label: 'Delete',
      icon: '🗑️',
      danger: true,
      onClick: () => handleDeleteTask(task.id)
    }
  ];

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-600 dark:text-red-400';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'low': return 'text-green-600 dark:text-green-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };


  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Tasks" />
      
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Task Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Organize and track your tasks efficiently
          </p>
        </div>
        
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          leftIcon="➕"
          disabled={isLoading}
        >
          Add New Task
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tasks</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {tasks.length}
                </p>
              </div>
              <div className="p-3 bg-blue-100 text-blue-600 rounded-full dark:bg-blue-900/20 dark:text-blue-400">
                📋
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">In Progress</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {tasksByStatus['in-progress'].length}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full dark:bg-yellow-900/20 dark:text-yellow-400">
                ⚡
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {tasksByStatus.completed.length}
                </p>
              </div>
              <div className="p-3 bg-green-100 text-green-600 rounded-full dark:bg-green-900/20 dark:text-green-400">
                ✅
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Task Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Task</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Task Title</Label>
                  <Input
                    id="title"
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter task title..."
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  type="text"
                  value={newTask.description}
                  onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Task description..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Priority</Label>
                  <Select
                    options={priorityOptions}
                    value={newTask.priority}
                    onChange={(value) => setNewTask(prev => ({ ...prev, priority: value as Task['priority'] }))}
                  />
                </div>
                
                <div>
                  <Label>Status</Label>
                  <Select
                    options={statusOptions}
                    value={newTask.status}
                    onChange={(value) => setNewTask(prev => ({ ...prev, status: value as Task['status'] }))}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <ButtonGroup>
              <Button 
                variant="outline" 
                onClick={() => setShowAddForm(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleAddTask}
                loading={isLoading}
              >
                Add Task
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label>Filter by Status</Label>
              <Select
                options={[
                  { value: '', label: 'All Statuses' },
                  ...statusOptions
                ]}
                value={filterStatus}
                onChange={setFilterStatus}
                clearable
              />
            </div>
            
            <div className="flex-1">
              <Label>Filter by Priority</Label>
              <Select
                options={[
                  { value: '', label: 'All Priorities' },
                  ...priorityOptions
                ]}
                value={filterPriority}
                onChange={setFilterPriority}
                clearable
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex items-center gap-3">
            <Spinner />
            <span className="text-gray-700 dark:text-gray-300">Processing...</span>
          </div>
        </div>
      )}

      {/* Task Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {['todo', 'in-progress', 'completed'].map((status) => {
          const statusTasks = tasksByStatus[status as keyof typeof tasksByStatus];
          const statusLabels = {
            'todo': '📋 To Do',
            'in-progress': '⚡ In Progress',
            'completed': '✅ Completed'
          };
          
          return (
            <div key={status} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {statusLabels[status as keyof typeof statusLabels]}
                </h3>
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded dark:bg-gray-700 dark:text-gray-400">
                  {statusTasks.length}
                </span>
              </div>

              <div className="space-y-3">
                {statusTasks.map((task) => (
                  <Card key={task.id} className="transition-shadow hover:shadow-md">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-medium text-gray-900 dark:text-white line-clamp-2">
                          {task.title}
                        </h4>
                        <Menu
                          trigger={
                            <Button variant="ghost" size="sm">
                              ⋯
                            </Button>
                          }
                          items={getTaskActions(task)}
                          position="bottom-right"
                        />
                      </div>

                      {task.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                          {task.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between mb-3">
                        <Tooltip content={`Priority: ${task.priority}`}>
                          <span className={`text-sm font-medium ${getPriorityColor(task.priority)}`}>
                            {priorityOptions.find(p => p.value === task.priority)?.icon} {task.priority}
                          </span>
                        </Tooltip>
                        
                        {task.dueDate && (
                          <Tooltip content="Due date">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              📅 {task.dueDate}
                            </span>
                          </Tooltip>
                        )}
                      </div>

                      <div className="mt-3">
                        <Label className="text-xs">Status:</Label>
                        <Select
                          options={statusOptions}
                          value={task.status}
                          onChange={(newStatus) => handleStatusChange(task.id, newStatus)}
                          size="sm"
                          className="mt-1"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {statusTasks.length === 0 && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <div className="text-2xl mb-2">📝</div>
                    <p className="text-sm">No tasks in this status</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}