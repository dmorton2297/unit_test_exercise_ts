import express, { Request, Response } from "express";
import { WordService } from "./services";
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;
const wordService = new WordService();

app.use(cors());
app.use(express.json());

app.post(
  "/snake_to_camel",
  (
    req: Request<{}, {}, { input: string }>,
    res: Response<{ camelCase: string }>
  ) => {
    const result = wordService.snakeToCamelCase({ word: req.body.input });
    res
      .status(200)
      .json({
        camelCase: result
      });
  }
);

app.listen(port, () => {
  console.info(`Server is running on port ${port}`);
});
