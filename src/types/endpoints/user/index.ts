export interface User {
    email: string;
    name: string;
    /**
     * @description enumeration based on gorest.co.in API
     */
    gender: 'male' | 'female';
    status: string;
}