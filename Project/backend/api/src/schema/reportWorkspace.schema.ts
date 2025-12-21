export interface ReportWorkspaceSchema {
    id: string;
    name: string;
    workspaceId: string;
    companyId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export interface CreateReportWorkspaceData {
    name: string;
    workspaceId: string;
    companyId: string;
}

export interface UpdateReportWorkspaceData {
    name: string;
    workspaceId: string;
    companyId: string;
}

