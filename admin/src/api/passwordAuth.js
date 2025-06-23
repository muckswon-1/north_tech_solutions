export const clientAdminLogin = async (credentials) => {
    try {
      const response = await sokoniApi.post(
        `${authServicePath}/admin-login`,
        credentials,
      );
      return response.data;
    } catch (error) {
      
      throw error;
    }
  };
  