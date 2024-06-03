const { getKnex, tables } = require("../data/index")
const { getLogger } = require("../core/logging")

const formatAccount = ({ ...account }) => ({
    ...account,
})

const SELECT_COLUMNS = [
    `${tables.account}.id`,
    "voornaam",
    "achternaam",
    "email",
    "passwordHash",
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

const create = async ({ voornaam, achternaam, email, passwordHash }) => {
    try {
        const [id] = await getKnex()(tables.account).insert({
            voornaam,
            achternaam,
            email,
            passwordHash,
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

const updateById = async (id, { voornaam, achternaam,email }) => {
    try {
        await getKnex()(tables.account)
            .update({
                voornaam,
                achternaam,
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
