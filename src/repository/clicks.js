const { getKnex, tables } = require("../data/index")
const { getLogger } = require("../core/logging")

const formatClicks = ({ ...clicks }) => ({
    ...clicks,
})

const SELECT_COLUMNS = [
    `${tables.clicks}.id`,
    "clickDetails",
    "createdAt"
]

const findAll = async () => {
    const clicks = await getKnex()(tables.clicks)
        .select(SELECT_COLUMNS)
        .orderBy("id", "asc")
    return clicks.map(formatClicks)
}

const findById = async (id) => {
    const clicks = await getKnex()(tables.clicks)
        .where(`${tables.clicks}.id`, id)
        .first(SELECT_COLUMNS)
    return clicks && formatClicks(clicks)
}

const create = async ({ clickDetails, createdAt }) => {
    try {
        const [id] = await getKnex()(tables.account).insert({
            clickDetails, 
            createdAt,
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

const updateById = async (id, { clickDetails, createdAt }) => {
    try {
        await getKnex()(tables.account)
            .update({
                clickDetails, 
                createdAt
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
    const rowsAffected = await getKnex()(tables.clicks)
        .delete()
        .where("id", id)
    return rowsAffected > 0
}
module.exports = {
    findAll,
    findById,
    create,
    updateById,
    deleteById,
}
