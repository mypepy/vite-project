import request from './request'

interface adminLoginData {
    password: string
    username: string
}
type PromiseRes<T = {}> = Promise<manageResult<T>>

interface manageResult<T = {}> {
    code: number;
    data: T;
    // message: string;
}
// 登录返回接口
interface adminLoginRes {
    token: string;
    tokenHead: string
}
// 当前用户信息
interface adminInfoRes {
    menus: []
}
interface adminListParams{keyword:string;pageNum:number;pageSize:number}

// 登录返回token
export const adminLoginApi = (data: adminLoginData): PromiseRes<adminLoginRes> => request.post('/admin/login', data)

// 获取当前登录用户信息
export const getAdminInfoApi = (): PromiseRes<adminInfoRes> => request.get('/admin/info')

// 获取用户数据列表
export const getAdminList=(data:adminListParams):PromiseRes<{list:{}[]}>=>request.get('/admin/list',{params:data})