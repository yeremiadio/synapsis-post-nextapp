import axiosInstance from '@/api/axiosInstance';
import { Post } from '@/types/endpoints/post';
import { IPaginationQueryParameters } from '@/types/global';
import API_URLS from '@/utils/configs/apiUrlsConfig';
import filterObjectIfValueIsEmpty from '@/utils/functions/filterObjectIfValueIsEmpty';

export const getPosts = async (params: Partial<IPaginationQueryParameters>): Promise<Post[]> => {
    const response = await axiosInstance.get<Post[]>(`${API_URLS.posts}`, { params: filterObjectIfValueIsEmpty(params) });
    return response.data;
};

export const getPostById = async (id: number): Promise<Post> => {
    const response = await axiosInstance.get<Post>(`${API_URLS.posts}/${id}`);
    return response.data;
};

export const createPost = async (post: Post): Promise<Post> => {
    const response = await axiosInstance.post(`${API_URLS.posts}`, post);
    return response.data;
};

export const updatePost = async (id: number, post: Post): Promise<Post> => {
    const response = await axiosInstance.put(`${API_URLS.posts}/${id}`, post);
    return response.data;
};

export const deletePost = async (id: number): Promise<void> => {
    await axiosInstance.delete(`${API_URLS.posts}/${id}`);
};