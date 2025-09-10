'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getTasks, createTask, updateTask, deleteTask } from '../../utils/api';
import TaskForm from '../../component/TaskForm';
import TaskList from '../../component/TaskList';
import SearchFilter from '../../component/SearchFilter';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const { currentUser, token } = useAuth();
  // console.log('Current User in Dashboard:', currentUser, token);
  const router = useRouter();
  
  const tasksPerPage = 10;

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
      return;
    }
    
    fetchTasks();
  }, [currentUser, searchTerm, statusFilter, currentPage]);

  const fetchTasks = async () => {
    if (!token) return;
    
    setIsLoading(true);
    
    try {
      const params = {
        page: currentPage,
        limit: tasksPerPage,
      };
      
      if (searchTerm) {
        params.search = searchTerm;
      }
      
      if (statusFilter !== 'all') {
        params.status = statusFilter;
      }
      
      const response = await getTasks(token, params);
      console.log('Fetched tasks:', response.data);
      setTasks(response.data);
      setTotalPages(response.data.length);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      // console.log(taskData)
      await createTask(token, taskData);
      setShowForm(false);
      fetchTasks();
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      await updateTask(token, editingTask._id, taskData);
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(token, taskId);
      fetchTasks();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTask(token, taskId, { status: newStatus });
      fetchTasks();
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleFilter = (filter) => {
    setStatusFilter(filter);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Tasks</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          + New Task
        </button>
      </div>
      
      <SearchFilter 
        onSearch={handleSearch} 
        onFilter={handleFilter} 
        currentFilter={statusFilter} 
      />
      
      {showForm && (
        <div className="mb-6">
          <TaskForm 
            onSubmit={handleCreateTask}
            onCancel={() => setShowForm(false)}
            isEditing={false}
          />
        </div>
      )}
      
      {editingTask && (
        <div className="mb-6">
          <TaskForm 
            task={editingTask}
            onSubmit={handleUpdateTask}
            onCancel={() => setEditingTask(null)}
            isEditing={true}
          />
        </div>
      )}
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <TaskList 
          tasks={tasks}
          onEdit={setEditingTask}
          onDelete={handleDeleteTask}
          onStatusChange={handleStatusChange}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Dashboard;