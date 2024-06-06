const { getLogger } = require("../core/logging")
const clicksRepository = require("../repository/clicks")
const ServiceError = require("../core/serviceError")

const handleDBError = require("./_handleDBError")

const debugLog = (message, meta = {}) => {
    if (!this.logger) this.logger = getLogger()
    this.logger.debug(message, meta)
}

const getAll = async () => {
    debugLog("Fetching all clicks")
    const clicks = await clicksRepository.findAll()
    return clicks
}

const getById = async (id) => {
    debugLog(`Fetching clicks with id ${id}`)
    const clicks = await clicksRepository.findById(id)

    if (!clicks) {
        throw ServiceError.notFound(`There are no clicks with id ${id}`, { id })
    }
    return clicks
}

const create = async ({ clickDetails, createdAt }) => {
    debugLog("Creating new clicks", { clickDetails, createdAt})

    try {
        const id = await clicksRepository.create({
            clickDetails, 
            createdAt
        })
        return getById(id)
    } catch (error) {
        throw handleDBError(error)
    }
}

const updateById = async (id,  newClickDetail ) => {
    debugLog(`Updating clicks with id ${id}`, { newClickDetail })

    try {
        await clicksRepository.updateById(id,  newClickDetail )
        return getById(id)
    } catch (error) {
        throw handleDBError(error)
    }
}

const deleteById = async (id) => {
    debugLog(`Deleting clicks with id ${id}`)
    await clicksRepository.deleteById(id)
}


module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
}
