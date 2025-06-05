import sokoniApi from "./axiosInstance"; // Import the configured Axios instance

// Define path relative to sokoniApi's baseURL
const authServicePath = "/password-auth";

export const clientRegister = async (user) => {
    try {
        const response = await sokoniApi.post(`${authServicePath}/register`, { ...user });
        if(response.status === 201){
            return response.data;
        }else {
            return null
        }
    
        
    } catch (error) {
        console.log(error);
        throw error;
    
    }
}

export const clientLogin = async (credentials) => {
    try {
        
        const response = await sokoniApi.post(`${authServicePath}/login`, credentials);
        console.log(response);
        return response.data;
        
    } catch (error) {
        console.log(error);
        throw error;
    
    }
}

export const fetchCurrentUser = async () => {
    try {
        const response = await sokoniApi.get(`${authServicePath}/me`);
        return response.data;
    } catch (error) {
        // This error is expected if user is not authenticated (e.g., 401)
        // console.log("Fetch current user error (expected if not logged in):", error.response?.data?.message || error.message);
        throw error;
    }
};

export const clientLogout = async () => {
    try {
        const response = await sokoniApi.get(`${authServicePath}/logout`);
        return response.data;
    } catch (error) {
        console.error("Logout API error:", error);
        throw error;
    }
};
