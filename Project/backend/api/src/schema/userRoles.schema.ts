export interface UserRolesSchema {
    id: string;
    companyId: string;
    subscriptionId: string | null;
    userId: string;
    roleId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export interface CreateUserRolesData {
    companyId: string;
    subscriptionId?: string;
    userId: string;
    roleId: string;
}

export interface UpdateUserRolesData {
    subscriptionId?: string;
    roleId?: string;
}











