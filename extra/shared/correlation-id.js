const uuid = require('uuid-random')

function getCorrelationId(headers){
    let correlationId;
    if(headers && headers.request_id){
        correlationId = headers.request_id
    } else {
        correlationId == uuid()
    }
    return correlationId
}

module.exports.getCorrelationId = getCorrelationId;
