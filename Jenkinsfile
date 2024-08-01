// upstream-job Jenkinsfile
pipeline {
    agent none

    environment {
        DOWNSTREAM_JOB_NAME = 'downstream-job'
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

// downstream-job Jenkinsfile
// pipeline {
//     agent none

//     parameters {
//         string(name: 'GIT_URL', description: 'The URL of the Git repository', defaultValue: '')
//         string(name: 'BRANCH_NAME', description: 'The branch name in the Git repository', defaultValue: '')
//         booleanParam(name: 'BUILD_ENABLED', description: 'Whether the build is enabled', defaultValue: true)
//         text(name: 'DESCRIPTION', description: 'A detailed description', defaultValue: '')
//         password(name: 'SECRET_KEY', description: 'A secret key', defaultValue: '')
//     }

//     stages {
//         stage('Display Parameters') {
//             steps {
//                 script {
//                     try {
//                         echo "Git URL: ${params.GIT_URL}"
//                         echo "Branch Name: ${params.BRANCH_NAME}"
//                         echo "Build Enabled: ${params.BUILD_ENABLED}"
//                         echo "Description: ${params.DESCRIPTION}"
//                         echo "Secret Key: ${params.SECRET_KEY}"

//                     } catch (Exception e) {
//                         error "Failed to display parameters: ${e.getMessage()}"
//                     }
//                 }
//             }
//         }
//     }
// }

