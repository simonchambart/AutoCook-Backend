const { getLogger } = require("../core/logging")
const accountRepository = require("../repository/account")
const ServiceError = require("../core/serviceError")
const { hashPassword, verifyPassword } = require("../core/password")
const { generateJWT, verifyJWT } = require("../core/jwt")
const Role = require("../core/roles")

const handleDBError = require("./_handleDBError")

const checkAndParseSession = async (authHeader) => {
    if (!authHeader) {
        throw ServiceError.unauthorized("You need to be signed in")
    }

    if (!authHeader.startsWith("Bearer ")) {
        throw ServiceError.unauthorized("Invalid authentication token")
    }

    const authToken = authHeader.substring(7)
    try {
        const { roles, accountId } = await verifyJWT(authToken)
        return {
            accountId,
            roles,
            authToken,
        }
    } catch (error) {
        getLogger().error(error.message, { error })
        throw new Error(error.message)
    }
}

const checkRole = (role, roles) => {
    const hasPermission = roles.includes(role)

    if (!hasPermission) {
        throw ServiceError.forbidden(
            "You are not allowed to view this part of the application",
        )
    }
}

const debugLog = (message, meta = {}) => {
    if (!this.logger) this.logger = getLogger()
    this.logger.debug(message, meta)
}

const getAll = async () => {
    debugLog("Fetching all accounts")
    const accounts = await accountRepository.findAll()
    return accounts
}

const getById = async (id) => {
    debugLog(`Fetching account with id ${id}`)
    const account = await accountRepository.findById(id)

    if (!account) {
        throw ServiceError.notFound(`There is no account with id ${id}`, { id })
    }
    return account
}

const create = async ({ userName, email, passwordHash, roles }) => {
    debugLog("Creating new account", { userName, email, passwordHash, roles })

    try {
        const id = await accountRepository.create({
            userName,
            email,
            passwordHash,
            roles,
        })
        return getById(id)
    } catch (error) {
        throw handleDBError(error)
    }
}

const updateById = async (id, { userName, email }) => {
    debugLog(`Updating account with id ${id}`, { userName, email })

    try {
        await accountRepository.updateById(id, { userName, email })
        return getById(id)
    } catch (error) {
        throw handleDBError(error)
    }
}

const deleteById = async (id) => {
    debugLog(`Deleting account with id ${id}`)
    await accountRepository.deleteById(id)
}

const makeLoginData = async (account) => {
    const token = await generateJWT(account)

    return {
        user: account,
        jwt: token,
    }
}

/**
 * Register a person.
 *
 * @param {object} account - Account to save.
 * @param {string} [account.userName] - Name of the account.
 */

const register = async ({ userName, email, password }) => {
    try {
        const passwordHash = await hashPassword(password)
        const accountId = await accountRepository.create({
            userName,
            email,
            passwordHash,
            roles: [Role.USER],
        })
        const account = await accountRepository.findById(accountId)
        return await makeLoginData(account)
    } catch (error) {
        throw handleDBError(error)
    }
}

const login = async (email, password) => {
    const account = await accountRepository.findByEmail(email)
    if (!account) {
        // DO NOT expose we don't know the account
        throw ServiceError.unauthorized(
            "The given email and password do not match",
        )
    }

    const passwordValid = await verifyPassword(password, account.passwordHash)

    if (!passwordValid) {
        // DO NOT expose we know the account but an invalid password was given
        throw ServiceError.unauthorized(
            "The given email and password do not match",
        )
    }

    const loginData = await makeLoginData(account)
    return loginData
}

module.exports = {
    checkRole,
    checkAndParseSession,
    getAll,
    getById,
    create,
    updateById,
    deleteById,
    login,
    register,
}
