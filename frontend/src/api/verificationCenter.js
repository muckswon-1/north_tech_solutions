import sokoniApi from "./axiosInstance";

const baseRoute = "verification-center";

export const clientVerifyEmail =  async (payload) => {
    const {userId, verificationCode} = payload
 try {
    const response = await sokoniApi.post(`${baseRoute}/${userId}/verify-email-code`, {code: verificationCode});
    if(response.status === 200) {
        return response.data;
    }
 } catch (error) {
    throw error
 }
}

export const clientVerifyPhoneNumber = async (payload) => {
    const {userId, phoneNumber} = payload
    try {
        const response = await sokoniApi.post(`${baseRoute}/${userId}/verify-phone-number`, {phoneNumber});
        if(response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw error
    }
}

export const clientCheckProfileVerificationComplete = async (payload) => {
    const {userId} = payload
    try {
        const response = await sokoniApi.get(`${baseRoute}/${userId}/profile-verification-completed`);
        if(response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw error
    }

}

export const clientSendVerificationEmail = async (payload) => {
    const {userId, email} = payload
    try {
        const response = await sokoniApi.post(`${baseRoute}/${userId}/send-email-code`, {email});
        if(response.status === 200) {
            return response;
        }

    } catch (error) {
        throw error
    
    }

}