const ServiceError = require("../core/serviceError")

const handleDBError = (error) => {
    const { code = "", sqlMessage } = error

    if (code === "ER_DUP_ENTRY") {
        switch (true) {
            case sqlMessage.includes("idx_account_email_unique"):
                return ServiceError.validationFailed(
                    "There is already an account with this email address",
                )
            default:
                return ServiceError.validationFailed("This item already exists")
        }
    }

    // Return error because we don't know what happened
    return error
}

module.exports = handleDBError
