import { NextFunction, Request, Response } from "express";
import {
  Result,
  ValidationError,
  body,
  param,
  validationResult,
} from "express-validator";
import { StatusCodes } from "http-status-codes";

const validBody = [
  body("content")
    .notEmpty()
    .withMessage("content should not be empty")
    .bail()
    .isString()
    .withMessage("content should be of type string")
    .bail()
    .trim(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return errorResponse(res, errors);
    }

    next();
  },
];

const validId = [
  param("id", "ID should be of type number").isNumeric(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return errorResponse(res, errors);
    }

    next();
  },
];

const errorResponse = (res: Response, errors: Result<ValidationError>) => {
  return res.status(StatusCodes.BAD_REQUEST).json({
    errors: errors.formatWith((error) => error.msg).array(),
    code: StatusCodes.BAD_REQUEST,
  });
};

const notesValidation = {
  validBody,
  validId,
};

export default notesValidation;
