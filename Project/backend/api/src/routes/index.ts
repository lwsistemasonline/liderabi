import { Request, Response, Router } from 'express';
import companyRoutes from './company.routes';
import userRoutes from './user.routes';
import userSubscriptionsRoutes from './userSubscriptions.routes';
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

const router = Router();

router.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'API is running' });
});

router.use('/companies', companyRoutes);
router.use('/users', userRoutes);
router.use('/users-subscriptions', userSubscriptionsRoutes);
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

export default router;

