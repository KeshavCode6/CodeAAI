export const ApiErrors = {
    CHALLENGE_ALREADY_SOLVED: [{ status: "error", message: "You have already solved this challenge!" }, { status: 200 }],
    INVALID_CHALLENGE_DATA: [{ status: "error", message: "Invalid challenge data!" }, { status: 500 }],
    INVALID_CHALLENGE_ID: [{ status: "error", message: "Invalid challenge ID!" }, { status: 500 }], 
    INVALID_PARAMETERS_FORMAT: [{ status: "error", message: "Invalid parameters format!" }, { status: 500 }],
    INVALID_USER_DATA: [{ status: "error", message: "User not logged in!" }, { status: 500 }], 
    MISSING_REQUEST_PARAMETERS: [{ status: "error", message: "Missing request parameters!" }, { status: 500 }], 
    REQUEST_USER_NOT_LOGGED_IN: [{ status: "error", message: "User not logged in!" }, { status: 500 }], 
    ERROR_PROCESSING_REQUEST: (err:any) => [`Error processing request: ${err.message}`, { status: 500 }], 
    UNAUTHORIZED_ACTION: [{ status: "error", message: "You are not authorized to perform this action!" }, { status: 500 }]
}