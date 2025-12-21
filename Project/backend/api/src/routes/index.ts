import { Request, Response, Router } from 'express';
import companyRoutes from './company.routes';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';
import levelRoutes from './level.routes';
import companyGroupRoutes from './companyGroup.routes';
import companyTypeRoutes from './companyType.routes';
import companySubscriptionsRoutes from './companySubscription.routes';
import companyBillingRoutes from './companyBilling.routes';
import methodPaymentRoutes from './methodPayment.routes';
import typeChargeRoutes from './typeCharge.routes';
import verificationTokenRoutes from './verificationToken.routes';
import userLogsRoutes from './userLogs.routes';
import rolesRoutes from './roles.routes';
import typeObjectRoutes from './typeObject.routes';
import objectsRoutes from './objects.routes';
import rolesObjectsRoutes from './rolesObjects.routes';
import companyParametersRoutes from './companyParameters.routes';
import userRolesRoutes from './userRoles.routes';
import userRolesObjectsRoutes from './userRolesObjects.routes';
import reportRoutes from './report.routes';
import reportWorkspaceRoutes from './reportWorkspace.routes';
import reportUserCompanyRoutes from './reportUserCompany.routes';

const router = Router();

router.get('/health', (_req: Request, res: Response) => {
  res.json({ 
    status: 'ok', 
    date: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }).replace(`, `,``), 
    message: 'API is running' });
});

router.use('/companies', companyRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/levels', levelRoutes);
router.use('/companies', companyRoutes);
router.use('/company-groups', companyGroupRoutes);
router.use('/company-types', companyTypeRoutes);
router.use('/company-subscriptions', companySubscriptionsRoutes);
router.use('/company-billings', companyBillingRoutes);
router.use('/company-parameters', companyParametersRoutes);
router.use('/method-payments', methodPaymentRoutes);
router.use('/verification-tokens', verificationTokenRoutes);
router.use('/roles', rolesRoutes);
router.use('/roles-objects', rolesObjectsRoutes);
router.use('/type-objects', typeObjectRoutes);
router.use('/type-charges', typeChargeRoutes);
router.use('/objects', objectsRoutes);
router.use('/user-logs', userLogsRoutes);
router.use('/user-roles', userRolesRoutes);
router.use('/user-roles-objects', userRolesObjectsRoutes);
router.use('/reports', reportRoutes);
router.use('/report-workspaces', reportWorkspaceRoutes);
router.use('/report-user-companies', reportUserCompanyRoutes);

export default router;

