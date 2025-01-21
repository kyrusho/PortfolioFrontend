import { meResponseModel } from '../model/meResponseModel';
import axiosInstance from '../Shared/Api/axiosInstance'; 

export const getMe = async (): Promise<meResponseModel[]> => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const response = await axiosInstance.get<meResponseModel[]>(
      `${backendUrl}/api/me`
    );
  return response.data;
};
