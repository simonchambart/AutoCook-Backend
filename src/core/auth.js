const creatorService = require('../service/delaware');


const requireAuthentication = async (ctx, next) => {
    const { authorization } = ctx.headers;


    const { authToken, ...session } = await creatorService.checkAndParseSession(
        authorization
    );

    ctx.state.session = session;
    ctx.state.authToken = authToken;

    return next();
};


const makeRequireRole = (role) => async (ctx, next) => {
    const { roles = [] } = ctx.state.session;

    creatorService.checkRole(role, roles);
    return next();
};

module.exports = {
    requireAuthentication,
    makeRequireRole,
};