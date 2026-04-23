// Jenkinsfile — Declarative CI/CD Pipeline
pipeline {
  agent any
 
  environment {
    APP_DIR = '/var/www/nextjs-app'
    REPO_URL = 'https://github.com/ESE-Wahaj/wahaj-portfolio.git'
  }
 
  stages {
 
    stage('Checkout') {
      steps {
        git branch: 'main',
            credentialsId: 'github-token',
            url: "${REPO_URL}"
      }
    }
 
    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }
 
    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }
 
    stage('Deploy') {
      steps {
        sh '''
          sudo mkdir -p ${APP_DIR}
          sudo rsync -av --delete .next/ ${APP_DIR}/.next/
          sudo rsync -av --delete public/ ${APP_DIR}/public/
          sudo cp package.json ${APP_DIR}/
          sudo cp next.config.js ${APP_DIR}/ 2>/dev/null || true
        '''
      }
    }
 
    stage('Restart App') {
      steps {
        sh 'sudo systemctl restart nextjs-app || true'
      }
    }
 
  }
 
  post {
    success {
      echo 'Deployment successful! App running on port 3000.'
    }
    failure {
      echo 'Pipeline failed. Check logs above.'
    }
  }
}
