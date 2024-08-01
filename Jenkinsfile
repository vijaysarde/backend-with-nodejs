pipeline {
    agent none

    environment {
        DOWNSTREAM_JOB_NAME = 'single'
        GIT_URL = sh(script: 'git config --get remote.origin.url', returnStdout: true).trim()
        BRANCH_NAME = sh(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
    }

    stages {
        stage('Retrieve SCM Information and Trigger Downstream Job') {
            steps {
                script {
                    try {
                        node() {
                            checkout scm
                            
                            echo "Git URL: ${env.GIT_URL}"
                            echo "Branch Name: ${env.BRANCH_NAME}"
                            def jobParameters = [
                                string(name: 'GIT_URL', value: env.GIT_URL),
                                string(name: 'BRANCH_NAME', value: env.BRANCH_NAME),
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
