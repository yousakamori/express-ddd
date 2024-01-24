import { PrismaBookRepository } from "Infrastructure/Prisma/Book/PrismaBookRepository";
import { PrismaClientManager } from "Infrastructure/Prisma/PrismaClientManager";
import { PrismaTransactionManager } from "Infrastructure/Prisma/PrismaTransactionManager";
import { Lifecycle, container } from "tsyringe";

// TSyringeを動かしてみた(2) #TypeScript - Qiita https://qiita.com/epsilonGtmyon/items/a3a8eb3bf492230d419f

// repository
container.register("IBookRepository", { useClass: PrismaBookRepository });

// transactionManager
container.register("ITransactionManager", {
  useClass: PrismaTransactionManager,
});

// IDataAccessClientManager
container.register(
  "IDataAccessClientManager",
  {
    useClass: PrismaClientManager,
  },
  // The same instance will be resolved for each resolution of this dependency during a single resolution chain
  {
    lifecycle: Lifecycle.ResolutionScoped,
  }
);
