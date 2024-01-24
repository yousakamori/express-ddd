import { Prisma, PrismaClient } from "@prisma/client";
import { IDataAccessClientManager } from "Infrastructure/shared/IDataAccessClientManager";
import prisma from "./PrismaClient";
type Client = PrismaClient | Prisma.TransactionClient;
export class PrismaClientManager implements IDataAccessClientManager<Client> {
  private client: Client = prisma;

  setClient(client: Client): void {
    this.client = client;
  }

  getClient(): Client {
    return this.client;
  }
}
