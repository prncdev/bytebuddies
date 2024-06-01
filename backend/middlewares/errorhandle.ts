import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = function (error, req, res, next) {
  // At the time of error if we got some sort of HTTP status code then use it otherwise, the default would be 500.
  const statusCode = res.statusCode || 500;

  // Set the status code that we got from the response and send it back with the message.
  if(process.env.NODE_ENV === 'production') {
    res.status(statusCode).json({ message: error.message })
  } else {
    res.status(statusCode).json({ message: error.message, stack: error.stack, });
  }

  // IF we have some more middleware functions then control will jump on to the next middleware function.
  next();
};
