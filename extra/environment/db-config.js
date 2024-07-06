function getDBConfiguration(){
    return {
        mongoUser: `${process.env.mongouser}`,
        mongoPassword: `${process.env.mongopassword}`,
        mongoConnectionString: `${process.env.mongoconnectionstring}`
    }
}

module.exports.getDBConfiguration = getDBConfiguration
