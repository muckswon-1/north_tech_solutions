// Fetch all users

export const clientGetAllUsers = async () => {
    try {
        const response = await sokoniApi.get(usersBasePath);

        if(response.status === 200){
            return response.data
        }
    } catch (error) {
        throw error
    }
}


export const clientAdminResetUserPassword = async (id) => {
    try {

        const response = await sokoniApi.patch(`${usersBasePath}/${id}/admin-reset-password`);

        if(response.status === 200) {
            return true;
        }
        
    } catch (error) {
        throw error
    }
}


