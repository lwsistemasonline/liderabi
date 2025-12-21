export interface ReportSchema {
    id: string;
    name: string;
    workspaceId: string;
    reportId: string;
    embedUrl: string;
    datasetId: string;
    companyId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export interface CreateReportData {
    name: string;
    workspaceId: string;
    reportId: string;
    embedUrl: string;
    datasetId: string;
    companyId: string;
}

export interface UpdateReportData {
    name: string;
    workspaceId: string;
    reportId: string;
    embedUrl: string;
    datasetId: string;
    companyId: string;
}

