const Router = require("@koa/router")

const installAccountRouter = require("./_accounts")
const installClicksRouter = require("./_clicks")

/**
 * Install all routes in the given Koa application.
 *
 * @param {Koa} app
 */
module.exports = (app) => {
    const router = new Router({
        prefix: "/api",
    })
    installAccountRouter(router)
    installClicksRouter(router)

    app.use(router.routes()).use(router.allowedMethods())
}
