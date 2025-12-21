export interface ReportUserCompanySchema {
    id: string;
    userId: string;
    companyId: string;
    reportId: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export interface CreateReportUserCompanyData {
    userId: string;
    companyId: string;
    reportId: string;
    isActive: boolean;
}

export interface UpdateReportUserCompanyData {
    userId: string;
    companyId: string;
    reportId: string;
    isActive: boolean;
}

