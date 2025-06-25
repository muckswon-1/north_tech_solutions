import sokoniApi from "./axiosInstance";

const baseRoute = 'inquiry-drafts';

export const clientGetAllUserInquiryDrafts =  async (userId) => {
    try {
        const response = await sokoniApi.get(`${baseRoute}/${userId}`);
        return response.data;
    } catch (error) {
        throw error
    }
}

export const clientGetInquiryDraftById = async (userId, inquiryDraftId) => {
    try {
        const response = await sokoniApi.get(`${baseRoute}/${userId}/${inquiryDraftId}`);
        return  response.data;
    } catch (error) {
        throw error
    }

}

export const clientUpdateInquiryDraft = async (payload) => {
   
    try {
        const {userId, inquiryDraftId, quantity} = payload;
    
            const response = await sokoniApi.patch(`${baseRoute}/${userId}/${inquiryDraftId}`,{quantity});
            return response.data;
        
        
         
    } catch (error) {
        throw error
    }
}

export const clientCreateInquiryDraft = async (payload) => {
    try {
        const {userId, inquiryDraft} = payload
       
        const response = await sokoniApi.post(`${baseRoute}/${userId}`, inquiryDraft);
        return response.data;
    } catch (error) {
        throw error
    }
}

export const clientDeleteInquiryDraft = async (payload) => {
    try {
       
       const {userId, inquiryDraftId} = payload;
        const response = await sokoniApi.delete(`${baseRoute}/${userId}/${inquiryDraftId}`);
        return response.data;
    } catch (error) {
        throw error
    
    }
}

export const clientClearDraftInquiries = async (userId) => {
    try {
        const response = await sokoniApi.delete(`${baseRoute}/${userId}`);
        return response.data;
    } catch (error) {
        throw error
    }
}

