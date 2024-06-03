const Router = require("@koa/router")
const Joi = require("joi")

const accountService = require("../service/account") // nog toevoegen
const validate = require("../core/validation")
const { requireAuthentication} = require("../core/auth")

const getAllAccounts = async (ctx) => {
    ctx.body = await accountService.getAll()
}

const getAccountById = async (ctx) => {
    ctx.body = await accountService.getById(ctx.params.id)
    ctx.status = 200
}
getAccountById.validationScheme = {
    params: {
        id: Joi.number().integer().positive(),
    },
}

const createAccount = async (ctx) => {
    const newAccount = await accountService.create({
        ...ctx.request.body,
    })
    ctx.body = newAccount
    ctx.status = 201
}

createAccount.validationScheme = {
    body: {
        voornaam: Joi.string(),
        achternaam: Joi.string(),
        email: Joi.string(),
        passwordHash: Joi.string(),
    },
}

const updateAccountById = async (ctx) => {
    ctx.body = await accountService.updateById(Number(ctx.params.id), {
        ...ctx.request.body,
    })
}

updateAccountById.validationScheme = {
    params: {
        id: Joi.number().integer().positive(),
    },
    body: {
        id: Joi.number().integer().positive().optional(),
        voornaam: Joi.string(),
        achternaam: Joi.string(),
        email: Joi.string().email(),
    },
}

const deleteAccount = async (ctx) => {
    await accountService.deleteById(ctx.params.id)
    ctx.status = 204
}
deleteAccount.validationScheme = {
    params: {
        id: Joi.number().integer().positive(),
    },
}

const register = async (ctx) => {
    const account = await accountService.register(ctx.request.body)
    ctx.status = 200
    ctx.body = account
}
register.validationScheme = {
    body: {
        voornaam: Joi.string(),
        achternaam: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string().min(2).max(30),
    },
}

const login = async (ctx) => {
    const { email } = ctx.request.body
    const { password } = ctx.request.body

    const loginData = await accountService.login(email, password)
    ctx.body = loginData
}
login.validationScheme = {
    body: {
        email: Joi.string().email(),
        password: Joi.string(),
    },
}

/**
 * Install transaction routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
    const router = new Router({
        prefix: "/accounts",
    })

    router.post("/login", validate(login.validationScheme), login)
    router.post("/register", validate(register.validationScheme), register)

    router.get(
        "/",
        requireAuthentication,
        getAllAccounts,
    )
    router.get(
        "/:id",
        requireAuthentication,
        validate(getAccountById.validationScheme),
        getAccountById,
    )
    // router.post('/', validate(createAccount.validationScheme), createAccount);  //volgens mij mag deze nu weg omdat je al een register methode hebt
    router.put(
        "/:id",
        requireAuthentication,
        validate(updateAccountById.validationScheme),
        updateAccountById,
    )
    router.delete(
        "/:id",
        requireAuthentication,
        validate(deleteAccount.validationScheme),
        deleteAccount,
    )

    app.use(router.routes()).use(router.allowedMethods())
}
