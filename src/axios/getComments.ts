import { commentResponseModel } from '../model/commentResponseModel';
import axiosInstance from '../Shared/Api/axiosInstance';

export const getComments = async (): Promise<commentResponseModel[]> => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const response = await axiosInstance.get<commentResponseModel[]>(`${backendUrl}/api/comments`);
    return response.data;
};
