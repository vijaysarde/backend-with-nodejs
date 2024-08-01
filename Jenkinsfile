#!groovy
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
                            // checkout scm

                            echo "NODE_NAME: $NODE_NAME"

                            // Get Git URL and branch name
                            def gitUrl = sh(script: 'git config --get remote.origin.url', returnStdout: true).trim()
                            def branchName = env.BRANCH_NAME ?: sh(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()

                            echo "Git URL: ${gitUrl}"
                            echo "Branch Name: ${branchName}"

                            // Define job parameters using explicit parameter class definitions
                            // def jobParameters = [
                            //     [$class: 'StringParameterValue', name: 'GIT_URL', value: gitUrl],
                            //     [$class: 'StringParameterValue', name: 'BRANCH_NAME', value: branchName],
                            //     [$class: 'BooleanParameterValue', name: 'BUILD_ENABLED', value: true],
                            //     [$class: 'TextParameterValue', name: 'DESCRIPTION', value: 'This is a detailed description.'],
                            //     [$class: 'FileParameterValue', name: 'CONFIG_FILE', value: '/path/to/config/file'],
                            //     [$class: 'RunParameterValue', name: 'RUN_ID', value: '123'],
                            //     [$class: 'ChoiceParameterValue', name: 'ENVIRONMENT', value: 'production', description: 'Choose the environment'],
                            //     [$class: 'PasswordParameterValue', name: 'SECRET_KEY', value: 'supersecretpassword']
                            // ]
                            def jobParameters = []

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


// def jobParameters = [
//     string(name: 'GIT_URL', value: gitUrl),
//     string(name: 'BRANCH_NAME', value: branchName),
//     booleanParam(name: 'BUILD_ENABLED', value: true),
//     text(name: 'DESCRIPTION', value: 'This is a detailed description.'),
//     file(name: 'CONFIG_FILE', value: '/path/to/config/file'),
//     [$class: 'RunParameterValue', name: 'RUN_ID', value: '123'],
//     [$class: 'ChoiceParameterValue', name: 'ENVIRONMENT', value: 'production', description: 'Choose the environment'],
//     [$class: 'PasswordParameterValue', name: 'SECRET_KEY', value: 'supersecretpassword']
// ]
