import prisma from '../database/prisma';
import { CreateUserSubscriptionsData, UpdateUserSubscriptionsData } from '../schema/userSubscriptions.schema';

export async function findAllUserSubscriptions() {
  return await prisma.userCompanySubscriptionAccess.findMany({
    where: {
      deletedAt: null,
    },
    include: {
      user: {
        include: {
          company: {
            include: {
              companyGroup: true,
            },
          },
        },
      },
      company: {
        include: {
          companyGroup: true,
        },
      },
      subscription: {
        include: {
          level: true,
        },
      },
      role: true,
    },
  });
}

export async function findUserSubscriptionsById(id: string) {
  return await prisma.userCompanySubscriptionAccess.findFirst({
    where: {
      id,
      deletedAt: null,
    },
    include: {
      user: {
        include: {
          company: {
            include: {
              companyGroup: true,
            },
          },
        },
      },
      company: {
        include: {
          companyGroup: true,
        },
      },
      subscription: {
        include: {
          level: true,
        },
      },
      role: true,
    },
  });
}

export async function createUserSubscriptions(data: CreateUserSubscriptionsData) {
  return await prisma.userCompanySubscriptionAccess.create({
    data: {
      userId: data.userId,
      companyId: data.companyId,
      subscriptionId: data.subscriptionId,
      roleId: data.roleId,
      email: data.email,
      emailVerified: data.emailVerified,
      password: data.password,
    },
    include: {
      user: {
        include: {
          company: {
            include: {
              companyGroup: true,
            },
          },
        },
      },
      company: {
        include: {
          companyGroup: true,
        },
      },
      subscription: {
        include: {
          level: true,
        },
      },
      role: true,
    },
  });
}

export async function updateUserSubscriptions(id: string, data: UpdateUserSubscriptionsData) {
  return await prisma.userCompanySubscriptionAccess.update({
    where: { id },
    data: {
      userId: data.userId,
      companyId: data.companyId,
      subscriptionId: data.subscriptionId,
      roleId: data.roleId,
      email: data.email,
      emailVerified: data.emailVerified,
      password: data.password,
    },
    include: {
      user: {
        include: {
          company: {
            include: {
              companyGroup: true,
            },
          },
        },
      },
      company: {
        include: {
          companyGroup: true,
        },
      },
      subscription: {
        include: {
          level: true,
        },
      },
      role: true,
    },
  });
}

export async function softDeleteUserSubscriptions(id: string) {
  return await prisma.userCompanySubscriptionAccess.update({
    where: { id },
    data: {
      deletedAt: new Date(),
    },
  });
}

export async function findUserSubscriptionsByEmail(email: string) {
  return await prisma.userCompanySubscriptionAccess.findFirst({
    where: {
      email,
      deletedAt: null,
    },
    include: {
      user: {
        include: {
          company: {
            include: {
              companyGroup: true,
            },
          },
        },
      },
      company: {
        include: {
          companyGroup: true,
        },
      },
      subscription: {
        include: {
          level: true,
        },
      },
      role: true,
    },
  });
}


