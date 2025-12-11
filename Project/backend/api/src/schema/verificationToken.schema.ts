export interface VerificationTokenSchema {
    id: string;
    identifier: string;
    token: string;
    expires: Date;
    createdAt: Date;
}

export interface CreateVerificationTokenData {
    identifier: string;
    token: string;
    expires: Date;
}

export interface UpdateVerificationTokenData {
    identifier?: string;
    token?: string;
    expires?: Date;
}











