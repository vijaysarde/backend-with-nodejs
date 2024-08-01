pipeline {
    agent none

    environment {
        DOWNSTREAM_JOB_NAME = 'downstream-pipeline'
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
                            def jobParameters = [
                                [$class: 'StringParameterValue', name: 'GIT_URL', value: gitUrl],
                                [$class: 'StringParameterValue', name: 'BRANCH_NAME', value: branchName]
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
