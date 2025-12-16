export interface RolesObjectsSchema {
    id: string;
    roleId: string;
    objectId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export interface CreateRolesObjectsData {
    roleId: string;
    objectId: string;
}

export interface UpdateRolesObjectsData {
    roleId?: string;
    objectId?: string;
}















