export interface ObjectsSchema {
    id: string;
    code: string;
    name: string;
    description: string | null;
    price: number;
    typeObjectId: string;
    parentObjectId: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export interface CreateObjectsData {
    code: string;
    name: string;
    description?: string;
    price: number;
    typeObjectId: string;
    parentObjectId?: string;
}

export interface UpdateObjectsData {
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    typeObjectId?: string;
    parentObjectId?: string;
}















