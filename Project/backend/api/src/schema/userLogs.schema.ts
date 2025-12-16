export interface UserLogsSchema {
    id: string;
    datelog: Date;
    userId: string;
    companyId: string;
    ip_address: string;
    endpoint: string;
    method: string;
    status_code: number;
    entity: string;
    changes: any | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export interface CreateUserLogsData {
    userId: string;
    companyId: string;
    ip_address: string;
    endpoint: string;
    method: string;
    status_code: number;
    entity: string;
    changes?: any;
}

export interface UpdateUserLogsData {
    ip_address?: string;
    endpoint?: string;
    method?: string;
    status_code?: number;
    entity?: string;
    changes?: any;
}















