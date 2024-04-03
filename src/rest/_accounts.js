const Router = require('@koa/router');
const Joi=require('joi');

const accountService = require('../service/account');   //nog toevoegen
const validate=require('../core/validation');
const { requireAuthentication, makeRequireRole } = require('../core/auth');
const Role = require('../core/roles');

const checkAccountId = (ctx, next) => {
    const { accountId, roles } = ctx.state.session;
    const { id } = ctx.params;

    // You can only get our own data unless you're an admin
    if (id !== accountId && !roles.includes(Role.PREMIUM)) {
        return ctx.throw(
            403,
            'You are not allowed to view this acount\'s information',
            {
                code: 'FORBIDDEN',
            }
        );
    }
    return next();
};

const checkAccountIdForEdit = (ctx, next) => {
    const { accountId, roles } = ctx.state.session;
    const { id } = ctx.params;

    // You can only get our own data unless you're a premium
    if (id !== accountId && !roles.includes(Role.PREMIUM)) {
        return ctx.throw(
            403,
            'You need to have a premium account to edit your profile!',
            {
                code: 'FORBIDDEN',
            }
        );
    }
    return next();
};

const getAllAccounts = async (ctx) => {
    ctx.body = await accountService.getAll();
};

const getAccountById = async (ctx) => {
    ctx.body = await accountService.getById(ctx.params.id);
    ctx.status = 200;
};
getAccountById.validationScheme={
    params: {
        id: Joi.number().integer().positive()
    }
};

const createAccount = async (ctx) => {
    const newAccount = await accountService.create({
        ...ctx.request.body
    });
    ctx.body = newAccount;
    ctx.status = 201;
};

createAccount.validationScheme={
    body: {
        userName:Joi.string(),
        email: Joi.string(),
        password_hash : Joi.string()
    }
};

const updateAccountById = async (ctx) => {
    ctx.body = await accountService.updateById(Number(ctx.params.id), {
        ...ctx.request.body
    });
};

updateAccountById.validationScheme = {
    params: {
        id: Joi.number().integer().positive(),
    },
    body: {
        id: Joi.number().integer().positive().optional(),
        userName: Joi.string(),
        email: Joi.string().email()
    }
};

const deleteAccount = async (ctx) => {
    await accountService.deleteById(ctx.params.id);
    ctx.status = 204;
};
deleteAccount.validationScheme = {
    params: {
        id: Joi.number().integer().positive(),
    },
};

const register = async (ctx) => {
    console.log(ctx.request.body);
    const account = await accountService.register(ctx.request.body);
    ctx.status = 200;
    ctx.body = account;
};
register.validationScheme = {
    body: {
        userName: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string().min(2).max(30)
    },
};

const login = async (ctx) => {
    const email = ctx.request.body.email;
    const password = ctx.request.body.password;
    console.log(email);
    const token = await accountService.login(email, password);
    ctx.body = token;
};
login.validationScheme = {
    body: {
        email: Joi.string().email(),
        password: Joi.string(),
    },
};

/**
 * Install transaction routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
    const router = new Router({
        prefix: '/accounts',
    });

    router.post('/login', validate(login.validationScheme), login);
    router.post('/register', validate(register.validationScheme), register);

    const requireAdmin = makeRequireRole(Role.ADMIN);

    router.get('/', requireAuthentication, requireAdmin, checkAccountId, getAllAccounts);
    router.get('/:id', requireAuthentication, validate(getAccountById.validationScheme), checkAccountId, getAccountById);
    // router.post('/', validate(createAccount.validationScheme), createAccount);  //volgens mij mag deze nu weg omdat je al een register methode hebt
    router.put('/:id', requireAuthentication, checkAccountIdForEdit, validate(updateAccountById.validationScheme), updateAccountById);
    router.delete('/:id', requireAuthentication, checkAccountId, validate(deleteAccount.validationScheme), deleteAccount);

    app.use(router.routes()).use(router.allowedMethods());
};