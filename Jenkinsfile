pipeline {
    agent none

    environment {
        DOWNSTREAM_JOB_NAME = 'single'
    }

    stages {
        stage('Retrieve SCM Information and Trigger Downstream Job') {
            steps {
                script {
                    try {
                        node() {
                            checkout scm
                            def gitUrl = sh(script: 'git config --get remote.origin.url', returnStdout: true).trim()
                            def branchName = env.BRANCH_NAME ?: sh(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
                            def buildEnabled = true
                            def description = 'This is a detailed description.'
                            def secretKey = 'supersecretpassword'
                            def jobParameters = [
                                string(name: 'GIT_URL', value: gitUrl),
                                string(name: 'BRANCH_NAME', value: branchName),
                                booleanParam(name: 'BUILD_ENABLED', value: buildEnabled),
                                text(name: 'DESCRIPTION', value: description),
                                password(name: 'SECRET_KEY', value: secretKey)
                            ]
                            
                            build job: "${env.DOWNSTREAM_JOB_NAME}", propagate: true, parameters: jobParameters
                        }
                    } catch (Exception e) {
                        error "Failed to retrieve SCM information or trigger downstream job: ${e.getMessage()}"
                    }
                }
            }
        }
    }
}
