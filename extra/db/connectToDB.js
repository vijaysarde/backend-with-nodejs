const mongoose = require('mongoose');
const Logger = require('../shared/logger')
const config = require('../environment/db-config')
const { getCorrelationId } = require('../shared/correction-id')

function connectToDB(){
    const correlationId = getCorrelationId()
    const logger = new Logger(correlationId, 'connectToDB', 'DB Connection')
    const { mongoUser, mongoPassword, mongoConnectionString } = config.getDBConfiguration();
    const dbURI = `mongodb://${mongoUser}:${mongoPassword}@${mongoConnectionString}`
    mongoose.connect(dbURI, { useNewUrlParser: true })
    mongoose.connection
        .on('error', function(err){
            logger.error(`DB Connection Error: ${err}`)
        })
        .once('open', function callback(){
            logger.info('DB Connected.')
        })
}

module.exports.connectToDB = connectToDB; 
