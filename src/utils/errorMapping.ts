import { AuthenticationException } from "@/exceptions/AuthenticationException";
import { AuthorizationException } from "@/exceptions/AuthorizationException";
import { BadRequestException } from "@/exceptions/BadRequestException";
import { InvalidValueException } from "@/exceptions/InvalidValueException";
import { NotFoundException } from "@/exceptions/NotFoundException";
import { ServerDownException } from "@/exceptions/ServerDownException";
import { UserNotFoundException } from "@/exceptions/UserNotFoundException";

const errorMessages = {
    ServerDownException: {
        title: "Server Down",
        message: (error: ServerDownException) => error.props.title || "Server Down for Maintenance. Please try again after sometime.",
        action: "Retry",
      },
    AuthenticationException: {
      title: "Authentication Error",
      message: (error: AuthenticationException) => error.props.title || "You need to log in again.",
      action: "Retry",
    },
    InvalidValueException: {
      title: "Validation Error",
      message: (error: InvalidValueException) => error.props.title || "Please fix the invalid inputs.",
      action: "Fix Input",
    },
    NotFoundException: {
      title: "Not Found",
      message: (error: NotFoundException) => error.props.title || "The requested resource could not be found.",
      action: "Go Back",
    },
    BadRequestException: {
        title: "Invalid Value",
        message: (error: BadRequestException) => error.props.title || "Please fix the invalid inputs.",
        action: "Retry",
      },
      UserNotFoundException: {
        title: "User Not Found",
        message: (error: UserNotFoundException) => error.props.title || "The User does not exist.",
        action: "Retry",
      },
      AuthorizationException: {
        title: "Not Allowed",
        message: (error: AuthorizationException) => error.props.title || "The requested resource could not be accessed.",
        action: "Retry",
      },
    // Add more error types as needed
  };