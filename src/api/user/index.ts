import axiosInstance from '@/api/axiosInstance';
import { User } from '@/types/endpoints/user';
import { IPaginationQueryParameters } from '@/types/global';
import API_URLS from '@/utils/configs/apiUrlsConfig';
import filterObjectIfValueIsEmpty from '@/utils/functions/filterObjectIfValueIsEmpty';

export const getUsers = async (params: Partial<IPaginationQueryParameters>): Promise<User[]> => {
    const response = await axiosInstance.get<User[]>(`${API_URLS.users}`, { params: filterObjectIfValueIsEmpty(params) });
    return response.data;
};

export const getUserById = async (id: number): Promise<User> => {
    const response = await axiosInstance.get<User>(`${API_URLS.users}/${id}`);
    return response.data;
};

export const createUser = async (user: User): Promise<User> => {
    const response = await axiosInstance.post(`${API_URLS.users}`, user);
    return response.data;
};

export const updateUser = async (id: number, user: User): Promise<User> => {
    const response = await axiosInstance.put(`${API_URLS.users}/${id}`, user);
    return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
    await axiosInstance.delete(`${API_URLS.users}/${id}`);
};