const Router = require("@koa/router")
const Joi = require("joi")

const clicksService = require("../service/clicks")
const validate = require("../core/validation")

const getAllClicks = async (ctx) => {
    ctx.body = await clicksService.getAll()
}

const getClicksById = async (ctx) => {
    ctx.body = await clicksService.getById(ctx.params.id)
    ctx.status = 200
}
getClicksById.validationScheme = {
    params: {
        id: Joi.number().integer().positive(),
    },
}

const createClicks = async (ctx) => {
    const newClicks = await clicksService.create({
        ...ctx.request.body,
    })
    ctx.body = newClicks
    ctx.status = 201
}

createClicks.validationScheme = {
    body: {
        clickDetails: Joi.array(),   // .items(Joi.string()).required(), DIT KAN JE ACHTERAF ERBIJ ZETTEN VOOR EXTRA VALIDATION MAAR DIT HEB IK NOG NIET OP FOUTEN GETEST
        createdAt: Joi.date()
    },
}

const updateClicksById = async (ctx) => {
    ctx.body = await clicksService.updateById(Number(ctx.params.id), {
        ...ctx.request.body,
    })
}

updateClicksById.validationScheme = {
    params: {
        id: Joi.number().integer().positive(),
    },
    body: {
        id: Joi.number().integer().positive().optional(),
        clickDetails: Joi.array(),   // .items(Joi.string()).required(), DIT KAN JE ACHTERAF ERBIJ ZETTEN VOOR EXTRA VALIDATION MAAR DIT HEB IK NOG NIET OP FOUTEN GETEST
        createdAt: Joi.date()
    },
}

const deleteClicks = async (ctx) => {
    await clicksService.deleteById(ctx.params.id)
    ctx.status = 204
}
deleteClicks.validationScheme = {
    params: {
        id: Joi.number().integer().positive(),
    },
}

/**
 * Install transaction routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
    const router = new Router({
        prefix: "/clicks",
    })
    router.get(
        "/",
        getAllClicks,
    )
    router.get(
        "/:id",
        validate(getClicksById.validationScheme),
        getClicksById,
    )
    router.post(
        '/',
        validate(createClicks.validationScheme),
        createClicks
    ) 
    router.put(
        "/:id",
        validate(updateClicksById.validationScheme),
        updateClicksById,
    )
    router.delete(
        "/:id",
        validate(deleteClicks.validationScheme),
        deleteClicks,
    )

    app.use(router.routes()).use(router.allowedMethods())
}
