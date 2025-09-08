const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';


const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};


export const loginUser = (credentials) => {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: credentials,
  });
};

export const registerUser = (userData) => {
  return apiRequest('/auth/register', {
    method: 'POST',
    body: userData,
  });
};

export const getCurrentUser = (token) => {
  return apiRequest('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const getTasks = (token, params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  return apiRequest(`/tasks?${queryString}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createTask = (token, taskData) => {
  return apiRequest('/tasks', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: taskData,
  });
};

export const updateTask = (token, taskId, taskData) => {
  return apiRequest(`/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: taskData,
  });
};

export const deleteTask = (token, taskId) => {
  return apiRequest(`/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

