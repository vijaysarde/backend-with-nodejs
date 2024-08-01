pipeline {
    agent none
    stages {
        stage('Print all env after running - checkout scm') {
            steps {
                script {
                    node() {
                        checkout scm
                        sh '''
                            pwd
                            echo $BRANCH_NAME
                            ls -l
                            env
                        '''
                    }
                }
            }
        }
    }
}
