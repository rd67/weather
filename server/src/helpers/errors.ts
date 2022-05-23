import { STATUS_CODES, MESSAGES } from "@constants/constants";

//  This one does not trans the error message
export class OperationalError extends Error {
  public statusCode: number;
  public data: any;
  public log: boolean;

  constructor(
    message: string = MESSAGES.serverError,
    statusCode: number = STATUS_CODES.ACTION_FAILED,
    log: boolean = true,
    data: any = {}
  ) {
    super(message);

    //  This is a fix for incorrect instanceOf
    Object.setPrototypeOf(this, OperationalError.prototype);

    // Ensure the name of this error is the same as the class name
    // this.name = this.constructor.name;
    this.name = ""; // Used to cause messages like "UserError: message" instead of the default "Error: message"
    this.data = data;
    this.statusCode = statusCode;
    this.log = log;
  }
}

export class ValidationError extends Error {
  public code = "BadRequestError";
  public statusCode: number = STATUS_CODES.VALIDATION_FAILED;
  public data: any;
  public log: boolean;

  constructor(
    data: any,
    message: string = MESSAGES.validationFailed,
    log: boolean = true
  ) {
    super(message);

    //  This is a fix for incorrect instanceOf
    Object.setPrototypeOf(this, ValidationError.prototype);

    this.name = this.constructor.name;
    this.message = message;
    this.data = data;
    this.log = log;
  }
}

export class ActionFailedError extends Error {
  public code = "BadRequestError";
  public statusCode: number = STATUS_CODES.ACTION_FAILED;
  public data: any;
  public log: boolean;

  constructor(message: string, data: any = {}, log: boolean = true) {
    super(message);

    //  This is a fix for incorrect instanceOf
    Object.setPrototypeOf(this, ActionFailedError.prototype);

    this.name = this.constructor.name;
    this.data = data;
    this.log = log;
  }
}

export class NotFoundError extends Error {
  public code = "NotFoundError";
  public statusCode: number = STATUS_CODES.NOT_FOUND;
  public log: boolean;

  constructor(message: string, log: boolean = true) {
    super(message);

    //  This is a fix for incorrect instanceOf
    Object.setPrototypeOf(this, NotFoundError.prototype);

    this.name = this.constructor.name;
    this.log = log;
  }
}
