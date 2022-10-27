interface AdminObjItf {
    username?: string;
    nickname?: string;
    email?: string;
    password?: string;
    note?: string;
    status?: number;
    id?: number
}
interface AdminRoleFormData {
    userRole: RoleObjItf[];
     roleList:RoleObjItf[];
     adminId:number
}