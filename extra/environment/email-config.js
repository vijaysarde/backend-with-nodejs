const emailServicePrdURL = 'https://services.api.my-app.com/proxy/notification/v1/mail';

const emailServiceUri = {
    dev: 'https://services.dev.api.my-app.com/proxy/notification/v1/mail',
    qa: 'https://services.qa.api.my-app.com/proxy/notification/v1/mail',
    stg: 'https://services.stg.api.my-app.com/proxy/notification/v1/mail',
    perf: 'https://services.perf.api.my-app.com/proxy/notification/v1/mail',
    prdInt: emailServicePrdURL,
    prd: emailServicePrdURL,
    dr: 'https://services.dr.api.my-app.com/proxy/notification/v1/mail',
}

function getEmailServiceUri(env){
    return emailServiceUri[env]
}

module.exports.getEmailServiceUri = getEmailServiceUri;
