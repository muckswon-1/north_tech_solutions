import sokoniApi from './axiosInstance'; // Import the configured Axios instance

// Define path relative to sokoniApi's baseURL
const authServicePath = '/password-auth';

export const clientRegister = async (user) => {
  try {
    const response = await sokoniApi.post(`${authServicePath}/register`, {
      ...user,
    });

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error('User with this email already exists.');
    }
  } catch (error) {
    throw error;
  }
};

export const clientLogin = async (credentials) => {
  try {
    const response = await sokoniApi.post(
      `${authServicePath}/login`,
      credentials,
    );
    if (response.status === 401) {
      throw new Error('Invalid email or password');
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCurrentUser = async () => {
  try {
    const response = await sokoniApi.get(`${authServicePath}/me`);
    // Axios resolves only for 2xx status codes, so response.data should be available.
    // Assuming a successful response from /me includes a 'user' object.
    return response.data; // This should ideally contain { user: ... }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // User is not authenticated. This is an expected scenario for this function.
      // Return a specific structure indicating no authenticated user.
      return { user: null };
    }
    // For any other errors (network issues, server 500, etc.), re-throw them
    // so they can be handled by the calling thunk as actual application errors.
    throw error;
  }
};

export const clientLogout = async () => {
  try {
    const response = await sokoniApi.get(`${authServicePath}/logout`);
    return response.data;
  } catch (error) {
    console.error('Logout API error:', error);
    throw error;
  }
};
