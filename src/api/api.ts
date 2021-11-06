import axios, {AxiosResponse} from "axios";
import {UserType} from "../redux/users-reducer";
import {UserProfileType} from "../redux/profile-reducer";
import {AuthType} from "../redux/auth-reducer";

const instance = axios.create({
    withCredentials: true,
    headers: {"API-KEY": "089d3e24-70d2-4632-9ce2-42855d61866e"},
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})

export const userAPI = {
    getUsers: (currentPage: number, pageSize: number) => {
        return instance.get<void, AxiosResponse<{ items: Array<UserType>, totalCount: number }>>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    follow (userId: number) {
        return instance.post<void, AxiosResponse<{ items: Array<UserType>, resultCode: number }>>(`follow/${userId}`)
    },
    unfollow (userId: number) {
       return instance.delete<void, AxiosResponse<{ items: Array<UserType>, resultCode: number }>>(`follow/${userId}`)
        },
    getProfile: (userId: string) => {
        return instance.get<void, AxiosResponse<UserProfileType>>(`profile/` + userId)
            }
    }

export const authAPI = {
   me() {
       return instance.get<void, AxiosResponse<{ data: AuthType, resultCode: number }>>(`auth/me`)
   }
}

