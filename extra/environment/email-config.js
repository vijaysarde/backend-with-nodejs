const emailServicePrdURL = 'https://services.api.my-app.com/v2/email';

const emailServiceUri = {
    dev: 'https://services.dev.api.my-app.com/v2/email',
    qa: 'https://services.qa.api.my-app.com/v2/email',
    stg: 'https://services.stg.api.my-app.com/v2/email',
    perf: 'https://services.perf.api.my-app.com/v2/email',
    prdInt: emailServicePrdURL,
    prd: emailServicePrdURL,
    dr: 'https://services.dr.api.my-app.com/v2/email',
}

function getEmailServiceUri(env){
    return emailServiceUri[env]
}

module.exports.getEmailServiceUri = getEmailServiceUri;
