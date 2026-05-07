import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

// Custom error class for handling application errors
export class AppError extends Error {
    constructor(
        public statusCode: number,
        public message: string, 
        public isOperational: boolean = true
    ) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
    Object.setPrototypeOf(this, AppError.prototype);    
}
}


// The Global Error Handler
export const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) : void=> {
    console.error(err);

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    res.status(400).json({
      error: 'Validation failed',
      details: err.errors.map((e) => ({
        path: e.path.join('.'),
        message: e.message,
      })),
    });
    return;
  }

    // Hanlde Operational Errors 
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            message: err.message, 

        }); 
        return;
    }

    // Handle Unkown Errors
    res.status(500).json({
        message: "Internal Server Error"
    })
};