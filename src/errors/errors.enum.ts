export enum ReasonError {
  AUTHORIZATION_ERROR = 1000,
  TOKEN_IS_MISSING = 1100,
  AUDIENCE_ERROR = 1200,
  PERMISSION_DENIED = 1300,
  KEYCLOAK_ID_MISSING = 1400,
  HMAC_NOT_VALID = 1500,

  VALIDATION_ERROR = 2000, //For this error, the response may contain (optionally) the key "errors" with a description of the errors of checking the received data from the request. 

  DATABASE_ERROR = 3000, //Errors in this section refer directly to the absence of a record in the corresponding database tables
  ACCOUNT_NOT_FOUND = 3100,
  APPLICATION_NOT_FOUND = 3200,
  CARD_NOT_FOUND = 3300,
  CARD_ACTION_NOT_FOUND = 3311,
  CARD_ACTION_CODE_NOT_FOUND = 3312,
  CARD_ACTION_DEVICE_NOT_FOUND = 3313,
  CARD_ACTION_SESSION_NOT_FOUND = 3314,
  CARD_TOPUP_REQUEST_NOT_FOUND = 3320,
  DOCUMENT_NOT_FOUND = 3400,
  IDV_SESSION_NOT_FOUND = 3500,
  IDV_DATA_NOT_FOUND = 3510,
  REG_SESSION_NOT_FOUND = 3600,
  TRANSACTION_NOT_FOUND = 3700,
  TRANSACTION_BENEFICIARY_NOT_FORUND = 3710,
  TRANSACTION_CONFIRM_NOT_FORUND = 3720,
  USER_NOT_FOUND = 3800,
  USER_INFO_NOT_FOUND = 3810,

  API_ERROR = 4000, //Third-party API errors
  SATCHEL_ERROR = 4100, //an error that occurred in the process of executing a Satchel request, details see Errors
  SATCHEL_FAILED = 4110, //some Satchel requests return result: “fail”

  ARBIPAY_ERROR = 5000, //The errors are related to the business logic of Arbipay 

  ACCOUNT_ERROR = 5100,
  ACCOUNT_INSUFFICIENT_FUNDS = 5110, //there are not enough funds in the account
  ACCOUNT_SENDER_NOT_FOUND = 5121, //the payer's account was not found, in the transaction
  ACCOUNT_BENEFICIARY_NOT_FOUND = 5122, //the recipient's account was not found, in the transaction

  TRANSACTION_ERROR = 5200,
  TRANSACTION_NOT_EXECUTED = 5210, //transaction status is not EXECUTED
  TRANSACTION_ALREADY_CLOSED = 5220, //transaction status is not CREATED
  TRANSACTION_NOT_INTERNAL = 5231, //transaction is not INTERNAL
  TRANSACTION_NOT_SEPA = 5232, //transaction is not SEPA
  TRANSACTION_NOT_SWIFT = 5233, //transaction is not SWIFT
  TRANSACTION_NOT_CARD_TOPUP = 5234, //transaction is not CARD TOPUP
  TRANSACTION_PERIOD_FAILED = 5240, //such a time period for obtaining a list of transactions cannot be processed

  APPLICATION_ERROR = 5300,
  ACCOUNT_ALREADY_EXISTS = 5310, //an application to create another account is not possible
  APPLICATION_ALREADY_EXISTS = 5320, //the previous application has not yet been processed
  APPLICATION_ALREADY_APPROVED = 5321, //an attempt to process an already approved application
  APPLICATION_ALREADY_CLOSED = 5322, //it is not possible to change the status of an already processed application
  COMPANY_ALREADY_EXISTS = 5330, //a company with such registration data already exists, such an application is not possible
  BENEFICIARIES_NOT_EXIST = 5340, //there must be at least one beneficiary in the application for creating a corporate account

  CARD_ERROR = 5400,
  CARD_NOT_ACTIVATED = 5410, //the card is not activated, the uuid is missing
  CARD_ACTIVATE_CLOSED = 5420, //the card is already activated, reactivation or adding a new card is not possible
  CARD_TYPE_ERROR = 5430, //it is not possible to create a corporate card for a personal account, and vice versa
  CARD_ACTION_ALREADY_CLOSED = 5450, //the action with the card has already been completed
  CARD_AMOUNT_TOO_LOW = 5460, //the amount of the card top-up is too small, in the DEV, STG environments it must be at least 1000EUR

  IDV_ERROR = 5500,
  IDV_SESSION_CLOSED = 5510, //this identity verification session has already been completed

  REGISTER_ERROR = 5600,
  REGISTER_TRY_LATTER = 5610, //too little time has passed since the last attempt to register, try latter
  REGISTER_EMAIL_DONE = 5620, //EMAIL is already verified for this registration session
  REGISTER_PHONE_DONE = 5630, //PHONE is already verified for this registration session
  REGISTER_IP_BANNED = 5640, //too many requests from this IP
  REGISTER_NOT_COMPLETED = 5650, //it is not possible to add a user, registration is not completed
  REGISTER_USER_EXIST = 5660, //a user with such email or phone number already exists

  USER_ERROR = 5700,
  USER_DOCUMENT_USED = 5710, //this user document is in use (cannot be deleted)

  CONFIRM_ERROR = 6000, //Errors that occur when trying to confirm anything
  CONFIRM_TIME_IS_EXPIRED = 6010, //confirmation timed out
  CONFIRM_DEVICE_NOT_FOUND = 6020, //the user does not have devices through which he can confirm a certain action
  CONFIRM_SMS_LIMIT_ERROR = 6030, //the number of messages with an OTP code to confirm a certain action is limited
  CONFIRM_CODE_NOT_VALID = 6040, //Invalid OTP code to confirm a certain action
  CONFIRM_ALREADY_CLOSED = 6050, //confirmation for a certain action has already occurred

}

export enum HttpCode {
  CONTINUE = 100,
  SWITCHING_PROTOCOLS = 101,
  PROCESSING = 102,
  EARLYHINTS = 103,
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NON_AUTHORITATIVE_INFORMATION = 203,
  NO_CONTENT = 204,
  RESET_CONTENT = 205,
  PARTIAL_CONTENT = 206,
  AMBIGUOUS = 300,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  TEMPORARY_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  PROXY_AUTHENTICATION_REQUIRED = 407,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  GONE = 410,
  LENGTH_REQUIRED = 411,
  PRECONDITION_FAILED = 412,
  PAYLOAD_TOO_LARGE = 413,
  URI_TOO_LONG = 414,
  UNSUPPORTED_MEDIA_TYPE = 415,
  REQUESTED_RANGE_NOT_SATISFIABLE = 416,
  EXPECTATION_FAILED = 417,
  I_AM_A_TEAPOT = 418,
  MISDIRECTED = 421,
  UNPROCESSABLE_ENTITY = 422,
  FAILED_DEPENDENCY = 424,
  PRECONDITION_REQUIRED = 428,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  HTTP_VERSION_NOT_SUPPORTED = 505
}
