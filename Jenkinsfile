pipeline {
    agent any 
    stages {
        stage('Installing dependencies') { 
            steps {
                sh "sudo npm install"
            }
        }
        stage('Test') { 
            steps {
                echo 'nothing to test yet...'
            }
        }
        stage('Deploy') { 
            steps {
                sh "sudo rm -rf /var/www/vuexy/vuexy_master"
                sh "sudo cp -r /var/lib/jenkins/workspace/vuexy_master /var/www/vuexy/"
                sh "cd vuexy_master/"
            }
        }
        stage('Serve') { 
            steps{
                sh "sudo yarn build"
                sh "sudo systemctl restart nginx"
            }
        }
    }
}
