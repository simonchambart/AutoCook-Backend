const accountService = require("../service/account")

const requireAuthentication = async (ctx, next) => {
    const { authorization } = ctx.headers

    const { authToken, ...session } =
        await accountService.checkAndParseSession(authorization)

    ctx.state.session = session
    ctx.state.authToken = authToken

    return next()
}

const makeRequireRole = (role) => async (ctx, next) => {
    const { roles = [] } = ctx.state.session

    accountService.checkRole(role, roles)
    return next()
}

module.exports = {
    requireAuthentication,
    makeRequireRole,
}
