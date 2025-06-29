import sokoniApi from "./axiosInstance";
const usersBasePath = '/users'



export const clientGetUserById = async (id) => {
    try {

        const response = await sokoniApi.get(`${usersBasePath}/${id}`);

        if(response.status === 200) {
            return response.data;
        }

        
    } catch (error) {
        throw error
    }
}

export const clientUpdateUser = async (newUserInfo) => {
    try {
      
       const response = await  sokoniApi.patch(`${usersBasePath}/${newUserInfo.id}`,newUserInfo);
       
        if(response.status === 200) {
          return response.data;
        }

    }catch(error){
        throw  error
    }

}

export const clientCreateUser = async (user) => {
    try {
        const response = await sokoniApi.post(usersBasePath,{...user});
        
        if(response.status === 200) {
            return response
        }
        
    } catch (error) {
        throw error
    }
}



export const clientDeleteUser = async (id) => {
    try {
        const response = await sokoniApi.delete(`${usersBasePath}/${id}`);

        if(response.status === 404){
            return false
        }

        if(response.status === 200){
            return true
        }

    } catch (error) {
        throw error
    }
}


export const clientUserResetPassword = async (payload) => {
    try {
        const response = await sokoniApi.patch(`${usersBasePath}/${payload.id}/user-reset-password`,payload);
        if(response.status === 200){
            return response
        }
    } catch (error) {
        throw error
    }
}
