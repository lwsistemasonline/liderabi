import prisma from '../database/prisma';

export async function createSession(sessionToken: string, userId: string, expires: Date) {
  return await prisma.session.create({
    data: {
      sessionToken,
      userId,
      expires,
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
    },
  });
}

export async function findSessionByToken(sessionToken: string) {
  return await prisma.session.findFirst({
    where: {
      sessionToken,
      expires: {
        gt: new Date(), // Only return non-expired sessions
      },
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
    },
  });
}

export async function deleteSessionByToken(sessionToken: string) {
  return await prisma.session.deleteMany({
    where: {
      sessionToken,
    },
  });
}

export async function deleteSessionById(id: string) {
  return await prisma.session.delete({
    where: {
      id,
    },
  });
}

export async function deleteSessionsByUserId(userId: string) {
  return await prisma.session.deleteMany({
    where: {
      userId,
    },
  });
}

export async function findSessionsByUserId(userId: string) {
  return await prisma.session.findMany({
    where: {
      userId,
      expires: {
        gt: new Date(), // Only return non-expired sessions
      },
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
    },
  });
}

