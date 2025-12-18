import { PrismaClient } from "../../generated/prisma";
import { clientConfig } from "../../prisma.config";

const prisma = new PrismaClient(clientConfig);

export default prisma;