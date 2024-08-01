pipeline {
    agent none

    environment {
        // Define the downstream job name in an environment variable for reusability
        DOWNSTREAM_JOB_NAME = 'single'
    }

    stages {
        stage('Retrieve SCM Information and Trigger Downstream Job') {
            steps {
                script {
                    try {
                        node() {
                            // Checkout the SCM repository
                            checkout scm

                            // Get Git URL and branch name dynamically
                            def gitUrl = sh(script: 'git config --get remote.origin.url', returnStdout: true).trim()
                            def branchName = env.BRANCH_NAME ?: sh(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
                            
                            // Define additional parameters if needed
                            def buildEnabled = true
                            def description = 'This is a detailed description.'
                            def configFile = './Jenkinsfile'
                            def environment = 'production'
                            def secretKey = 'supersecretpassword'

                            env.configFile = configFile

                            sh 'cat ${env.configFile}'

                            // Define job parameters using environment variables and other parameters
                            def jobParameters = [
                                string(name: 'GIT_URL', value: gitUrl),
                                string(name: 'BRANCH_NAME', value: branchName),
                                booleanParam(name: 'BUILD_ENABLED', value: buildEnabled),
                                text(name: 'DESCRIPTION', value: description),
                                file(name: 'CONFIG_FILE', value: configFile),
                                choice(name: 'ENVIRONMENT', choices: ['production', 'staging', 'development'], description: 'Choose the environment'),
                                password(name: 'SECRET_KEY', value: secretKey)
                            ]

                            // Trigger the downstream job with parameters
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
