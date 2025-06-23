import sokoniApi from './axiosInstance';
const baseUploadPath = '/upload/image'

export const clientUpload = async (imageFile) => {

    
    try {
        const formData = new FormData();
        formData.append('file', imageFile)

        const response = await sokoniApi.post(baseUploadPath,formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        if(response.status === 201){
            return response.data.url
        }

    } catch (error) {
        throw error
    }
}