pipeline {
    agent none
    stages {
        stage('Print all env after running - checkout scm') {
            steps {
                script {
                    node() {
                        checkout scm
                        sh 'env'
                    }
                }
            }
        }
    }
}
