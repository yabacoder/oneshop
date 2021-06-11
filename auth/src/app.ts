import express, { Request, Response } from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError } from "@yctickets_/common";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
	cookieSession({
		signed: false,
		secure: process.env.NODE_ENV !== "test",
	})
);

app.use("/", (req: Request, res: Response) => {
	res.json({ content: "Welcome!" });
});

app.all("*", async (req, res) => {
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };
