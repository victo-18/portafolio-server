import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

export const inputValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await check("name")
  .notEmpty()
  .withMessage("The name field is required.")
  .run(req);

await check("email")
  .notEmpty()
  .withMessage("The email field is required.")
  .isEmail()
  .withMessage("A valid email is required.")
  .run(req);

await check("subject")
  .notEmpty()
  .withMessage("The subject field is required.")
  .run(req);

await check("message")
  .notEmpty()
  .withMessage("The message field is required.")
  .run(req);


  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json( { errors: errors.array() });
    return;
  }
  next();
};
