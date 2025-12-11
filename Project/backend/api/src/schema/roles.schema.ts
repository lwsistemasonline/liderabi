export interface RolesSchema {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export interface CreateRolesData {
    name: string;
}

export interface UpdateRolesData {
    name: string;
}











