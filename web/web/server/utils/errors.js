import Rollbar from 'rollbar';
import { NODE_ENV } from '../config/env';
const rollbar = new Rollbar('');

const notify = (message) => {
    if (NODE_ENV === 'production') {
        // rollbar.error(message);
    }
}

export const NotFound = function (error = 'The requested resource couldn\'t be found') {
    Error.captureStackTrace(this, this.constructor);
    const message = error;

    this.name = this.constructor.name;
    this.message = message;
    this.statusCode = 404;
    this.errorCode = 404;
}

export const BadRequest = function (error = 'The json data is malformed') {
    Error.captureStackTrace(this, this.constructor);
    const message = error;

    this.name = this.constructor.name;
    this.message = message;
    this.statusCode = 400;
    this.errorCode = 400;

    notify(message);
}

export const InternalServerError = function (error = 'The API did something wrong') {
    Error.captureStackTrace(this, this.constructor);
    const message = error;

    this.name = this.constructor.name;
    this.message = message;
    this.statusCode = 500;
    this.errorCode = 500;

    notify(message);
}

export const Unauthorized = function (error = 'Incorrect username or password') {
    Error.captureStackTrace(this, this.constructor);
    const message = error;

    this.name = this.constructor.name;
    this.message = message;
    this.statusCode = 401;
    this.errorCode = 401;
}

export const Deleted = function (error = 'Successfully deleted') {
    Error.captureStackTrace(this, this.constructor);
    const message = error;

    this.name = this.constructor.name;
    this.message = message;
    this.deleted = true;
    this.statusCode = 200;
    this.errorCode = 200;

    // rollbar.log(message);
}