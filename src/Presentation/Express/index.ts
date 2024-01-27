import "reflect-metadata";
import "../../Program";
import { container } from "tsyringe";
import {
  RegisterBookApplicationService,
  RegisterBookCommand,
} from "Application/Book/RegisterBookApplicationService/RegisterBookApplicationService";
import express, { json } from "express";
import { BookLogSubscriber } from "Application/shared/DomainEvent/subscribers/BookLogSubscriber";

const app = express();
const port = 3000;

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listen on port ${port}`);
  container.resolve(BookLogSubscriber);
});

app.use(json());
app.post("/book", async (req, res) => {
  // curl command
  // curl -X POST -H "Content-Type: application/json" -d '{"isbn":"9784167155557","title":"吾輩は猫である","priceAmount":770}' http://localhost:3000/book
  try {
    const requestBody = req.body as {
      isbn: string;
      title: string;
      priceAmount: number;
    };

    const registerBookApplicationService = container.resolve(
      RegisterBookApplicationService
    );

    const registerCommand: RegisterBookCommand = requestBody;
    await registerBookApplicationService.execute(registerCommand);

    res.status(200).json({ message: "success" });
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
});

app.post("/book", async (_req, res) => {
  res.status(200).json({ message: true });
});
