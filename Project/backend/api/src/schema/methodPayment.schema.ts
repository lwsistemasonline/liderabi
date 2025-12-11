import { CompanySubscriptionSchema } from "./companySubscription.schema";

export interface MethodPaymentSchema {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    companySubscriptions?: CompanySubscriptionSchema[];
}
