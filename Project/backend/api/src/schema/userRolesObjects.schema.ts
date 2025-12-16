export interface UserRolesObjectsSchema {
    id: string;
    userRoleId: string;
    objectId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export interface CreateUserRolesObjectsData {
    userRoleId: string;
    objectId: string;
}

export interface UpdateUserRolesObjectsData {
    userRoleId?: string;
    objectId?: string;
}















