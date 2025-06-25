import sokoniApi from "./axiosInstance";

const companyBasePath = "/company";


export const clientCreateCompany = async (userId, newCompany) => {
    try {
        const response = await sokoniApi.post(`${companyBasePath}/create/${userId}`,newCompany);
        if(response.status === 201){
            return response.data;
        }
    } catch (error) {
        throw error
    }

}

export const clientUpdateCompany = async (userId, updatedCompany) => {
    try {
        const response = await sokoniApi.patch(`${companyBasePath}/update/${userId}`,updatedCompany);
        if(response.status === 200){
            return response.data;
        }

    } catch (error) {
        
    }
}

export const clientGetCompany = async (userId) => {
    try {
        const response = await sokoniApi.get(`${companyBasePath}/${userId}`);
        if(response.status === 200){
            return response.data;
        }
    } catch (error) {
      throw error  
    }

}