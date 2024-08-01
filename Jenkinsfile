pipeline {
    agent none
    stages {
        stage('Print all env after running - checkout scm') {
            steps {
                script {
                    node() {
                        checkout scm
                        echo $BRANCH_NAME
                        def gitUrl = sh(script: 'git config --get remote.origin.url', returnStdout: true).trim()
                        def branchName = env.BRANCH_NAME ?: sh(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
    
                        echo "Git URL: ${gitUrl}"
                        echo "Branch Name: ${branchName}"
                    }
                }
            }
        }
    }
}
