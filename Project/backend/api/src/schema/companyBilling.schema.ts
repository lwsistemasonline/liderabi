import { CompanySchema } from "./company.schema";
import { CompanySubscriptionSchema } from "./companySubscription.schema";

export interface CompanyBillingSchema {
    id: string;
    companyId: string;
    company: CompanySchema;
    subscriptionId: string;
    subscription: CompanySubscriptionSchema;
    dueDate: Date;
    billingDate: Date;
    valueBilling: number;
    paymentDate: Date;
}