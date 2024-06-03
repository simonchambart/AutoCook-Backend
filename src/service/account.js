const { getLogger } = require("../core/logging")
const accountRepository = require("../repository/account")
const ServiceError = require("../core/serviceError")
const { hashPassword, verifyPassword } = require("../core/password")
const { generateJWT, verifyJWT } = require("../core/jwt")

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
        const { accountId } = await verifyJWT(authToken)
        return {
            accountId,
            authToken,
        }
    } catch (error) {
        getLogger().error(error.message, { error })
        throw new Error(error.message)
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

const create = async ({ voornaam, achternaam, email, passwordHash }) => {
    debugLog("Creating new account", { voornaam, achternaam, email, passwordHash})

    try {
        const id = await accountRepository.create({
            voornaam,
            achternaam,
            email,
            passwordHash
        })
        return getById(id)
    } catch (error) {
        throw handleDBError(error)
    }
}

const updateById = async (id, { voornaam, achternaam, email }) => {
    debugLog(`Updating account with id ${id}`, { voornaam, achternaam, email })

    try {
        await accountRepository.updateById(id, { voornaam, achternaam, email })
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
 * @param {string} [account.email] - Email of the account.
 */

const register = async ({ voornaam, achternaam, email, password }) => {
    try {
        const passwordHash = await hashPassword(password)
        const accountId = await accountRepository.create({
            voornaam,
            achternaam,
            email,
            passwordHash,
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
    checkAndParseSession,
    getAll,
    getById,
    create,
    updateById,
    deleteById,
    login,
    register,
}
