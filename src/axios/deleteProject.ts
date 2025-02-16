import axiosInstance from '../Shared/Api/axiosInstance';

export const deleteProject = async (projectId: number): Promise<void> => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    await axiosInstance.delete(`${backendUrl}/api/project/${projectId}`);
};
