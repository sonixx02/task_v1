const API_URL = 'http://localhost:5000'; 
export const userSignup = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return await response.json();
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

export const userLogin = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return await response.json();
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const getUserById = async (userId, token) => {
  try {
    const response = await fetch(`${API_URL}/user/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Get user error:', error);
    throw error;
  }
};

export const getAllUsers = async (token) => {
  try {
    const response = await fetch(`${API_URL}/user/allusers`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Get all users error:', error);
    throw error;
  }
};

export const deleteUser = async (userId, token) => {
  try {
    const response = await fetch(`${API_URL}/user/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Delete user error:', error);
    throw error;
  }
};

export const createRoutine = async (routineData, token) => {
  try {
    const response = await fetch(`${API_URL}/routines`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(routineData),
    });
    return await response.json();
  } catch (error) {
    console.error('Create routine error:', error);
    throw error;
  }
};

export const getAllRoutines = async () => {
  try {
    const response = await fetch(`${API_URL}/routines/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Get all routines error:', error);
    throw error;
  }
};

export const getRoutineById = async (routineId) => {
  try {
    const response = await fetch(`${API_URL}/routines/${routineId}`, {
      method: 'GET',
    });
    return await response.json();
  } catch (error) {
    console.error('Get routine by ID error:', error);
    throw error;
  }
};

export const updateRoutine = async (routineId, routineData, token) => {
  try {
    const response = await fetch(`${API_URL}/routines/${routineId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(routineData),
    });
    return await response.json();
  } catch (error) {
    console.error('Update routine error:', error);
    throw error;
  }
};

export const deleteRoutine = async (routineId, token) => {
  try {
    const response = await fetch(`${API_URL}/routines/${routineId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Delete routine error:', error);
    throw error;
  }
};


export const startRoutine = async (routineId, token) => {
  try {
    const response = await fetch(`${API_URL}/routines/${routineId}/progress/start`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Start routine error:', error);
    throw error;
  }
};

export const updateProgress = async (routineId, progressData, token) => {
  try {
    const response = await fetch(`${API_URL}/routines/${routineId}/progress`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(progressData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Update progress error:', error);
    throw error;
  }
};

export const getRoutineProgress = async (routineId, token) => {
  try {
    const response = await fetch(`${API_URL}/routines/${routineId}/progress`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Get routine progress error:', error);
    throw error;
  }
};


export const adminLogin = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return await response.json();
  } catch (error) {
    console.error('Admin Login error:', error);
    throw error;
  }
};

export const adminSignup = async (adminData) => {
  try {
    const response = await fetch(`${API_URL}/admin/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adminData),
    });
    return await response.json();
  } catch (error) {
    console.error('Admin Signup error:', error);
    throw error;
  }
};

export const adminLogout = async (token) => {
  try {
    const response = await fetch(`${API_URL}/admin/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Admin Logout error:', error);
    throw error;
  }
};

export const adminGetAllAdmins = async (token) => {
  try {
    const response = await fetch(`${API_URL}/admin/alladmin`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Get all admins error:', error);
    throw error;
  }
};

// Admin Routine Management
export const adminCreateRoutine = async (routineData, token) => {
  try {
    const response = await fetch(`${API_URL}/admin/create-routine`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(routineData),
    });
    return await response.json();
  } catch (error) {
    console.error('Admin Create Routine error:', error);
    throw error;
  }
};

export const adminGetAllRoutines = async (token) => {
  try {
    console.log(token);
    const response = await fetch(`${API_URL}/admin/routines`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log(response);
    return await response.json();
  } catch (error) {
    console.error('Admin Get All Routines error:', error);
    throw error;
  }
};

export const adminUpdateRoutine = async (routineId, routineData, token) => {
  try {
    const response = await fetch(`${API_URL}/admin/update-routine/${routineId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(routineData),
    });
    return await response.json();
  } catch (error) {
    console.error('Admin Update Routine error:', error);
    throw error;
  }
};

export const adminDeleteRoutine = async (routineId, token) => {
  try {
    const response = await fetch(`${API_URL}/admin/delete-routine/${routineId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Admin Delete Routine error:', error);
    throw error;
  }
};

