const { getKnex, tables } = require("../data/index")
const { getLogger } = require("../core/logging")

const formatAccount = ({ ...account }) => {
    return {
        ...account,
    }
}

const SELECT_COLUMNS = [
    `${tables.account}.id`,
    "userName",
    "email",
    "password_hash",
    "roles",
]

const findAll = async () => {
    const accounts = await getKnex()(tables.account)
        .select(SELECT_COLUMNS)
        .orderBy("id", "asc")
    return accounts.map(formatAccount)
}

const findById = async (id) => {
    const account = await getKnex()(tables.account)
        .where(`${tables.account}.id`, id)
        .first(SELECT_COLUMNS)
    return account && formatAccount(account)
}

const create = async ({ userName, email, passwordHash, roles }) => {
    try {
        const [id] = await getKnex()(tables.account).insert({
            userName,
            email,
            password_hash: passwordHash,
            roles: JSON.stringify(roles),
        })
        return id
    } catch (error) {
        const logger = getLogger()
        logger.error("Error in create", {
            error,
        })
        throw new Error("creation failed")
    }
}

const updateById = async (id, { userName, email }) => {
    try {
        await getKnex()(tables.account)
            .update({
                userName,
                email,
            })
            .where("id", id)
        return id
    } catch (error) {
        const logger = getLogger()
        logger.error("Error in update", {
            error,
        })
        throw new Error("update failed")
    }
}

const deleteById = async (id) => {
    const rowsAffected = await getKnex()(tables.account)
        .delete()
        .where("id", id)
    return rowsAffected > 0
}

const findByEmail = async (email) => {
    const account = await getKnex()(tables.account)
        .where(`${tables.account}.email`, email)
        .first(SELECT_COLUMNS)
    return formatAccount(account)
}

module.exports = {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
    findByEmail,
}
