export interface TypeObjectSchema {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export interface CreateTypeObjectData {
    name: string;
}

export interface UpdateTypeObjectData {
    name: string;
}











