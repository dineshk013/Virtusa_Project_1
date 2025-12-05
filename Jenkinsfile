pipeline {
  agent any

  environment {
    DOCKERHUB_CRED = 'dockerhub-creds'    // Jenkins credential ID (username/password)
    DOCKERHUB_USER = 'amanpardeshi01'     // your Docker Hub username
    BACKEND_IMAGE = "${DOCKERHUB_USER}/revcart-backend"
    FRONTEND_IMAGE = "${DOCKERHUB_USER}/revcart-frontend"
    IMAGE_TAG = "${env.BUILD_NUMBER}"
    MVN_OPTS = "-B -DskipTests"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Backend (Maven)') {
      steps {
        // run in Backend folder
        dir('Backend') {
          powershell "mvn ${env.MVN_OPTS} clean package"
        }
      }
    }

    stage('Build Frontend (npm)') {
      steps {
        dir('Frontend') {
          powershell 'npm ci'
          // use your build script; this repo uses `npm run build`
          powershell 'npm run build -- --configuration=production || npm run build'
        }
      }
    }

    stage('Docker: build & push') {
      steps {
        // use dockerhub credentials from Jenkins
        withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CRED}", usernameVariable: 'DH_USER', passwordVariable: 'DH_PASS')]) {
          // Use PowerShell because Jenkins is running on Windows
          powershell '''
            Write-Host "Docker login as $env:DH_USER"
            # login
            $p = echo $env:DH_PASS | docker login -u $env:DH_USER --password-stdin
            if ($LASTEXITCODE -ne 0) { throw "docker login failed" }

            # build backend image
            docker build -t ${env.BACKEND_IMAGE}:${env.IMAGE_TAG} -f Backend/Dockerfile Backend
            docker tag ${env.BACKEND_IMAGE}:${env.IMAGE_TAG} ${env.BACKEND_IMAGE}:latest

            # build frontend image
            docker build -t ${env.FRONTEND_IMAGE}:${env.IMAGE_TAG} -f Frontend/Dockerfile Frontend
            docker tag ${env.FRONTEND_IMAGE}:${env.IMAGE_TAG} ${env.FRONTEND_IMAGE}:latest

            # push
            docker push ${env.BACKEND_IMAGE}:${env.IMAGE_TAG}
            docker push ${env.BACKEND_IMAGE}:latest
            docker push ${env.FRONTEND_IMAGE}:${env.IMAGE_TAG}
            docker push ${env.FRONTEND_IMAGE}:latest

            # logout
            docker logout
          '''
        }
      }
    }
  }

  post {
    success {
      echo "Build and push succeeded: ${env.BUILD_NUMBER}"
    }
    failure {
      echo "Build failed. Check console output."
    }
  }
}
