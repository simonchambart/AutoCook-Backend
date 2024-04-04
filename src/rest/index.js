const Router = require("@koa/router")

const installAccountRouter = require("./_accounts")

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

    app.use(router.routes()).use(router.allowedMethods())
}
