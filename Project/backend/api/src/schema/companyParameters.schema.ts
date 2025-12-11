export interface CompanyParametersSchema {
    id: string;
    companyId: string;
    parameters: any | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export interface CreateCompanyParametersData {
    companyId: string;
    parameters?: any;
}

export interface UpdateCompanyParametersData {
    parameters?: any;
}











