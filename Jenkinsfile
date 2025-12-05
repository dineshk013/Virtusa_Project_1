pipeline {
  agent any

  environment {
    DOCKERHUB_CRED = 'dockerhub-creds'
    DOCKERHUB_USER = 'amanpardeshi01'
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
        dir('Backend') {
          powershell "mvn ${env.MVN_OPTS} clean package"
        }
      }
    }

    stage('Build Frontend (npm)') {
      steps {
        dir('Frontend') {
          // Install deps
          powershell 'npm ci'

          // Build with a PowerShell-friendly fallback: try production build, if it fails run default build
          powershell '''
            Write-Host "Running production build..."
            npm run build -- --configuration=production
            if ($LASTEXITCODE -ne 0) {
              Write-Host "Production build failed with exit code $LASTEXITCODE, trying default build..."
              npm run build
              if ($LASTEXITCODE -ne 0) {
                throw "Both production and default frontend builds failed (exit $LASTEXITCODE). See log above."
              }
            } else {
              Write-Host "Production build succeeded."
            }
          '''
        }
      }
    }

    stage('Docker: build & push') {
      steps {
        withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CRED}", usernameVariable: 'DH_USER', passwordVariable: 'DH_PASS')]) {
          powershell '''
            Write-Host "Logging into Docker Hub..."
            $pw = ConvertTo-SecureString $env:DH_PASS -AsPlainText -Force
            $cred = New-Object System.Management.Automation.PSCredential($env:DH_USER, $pw)
            echo $env:DH_PASS | docker login -u $env:DH_USER --password-stdin
            if ($LASTEXITCODE -ne 0) { throw "Docker login failed" }

            Write-Host "Building backend image..."
            docker build -t ${env.BACKEND_IMAGE}:${env.IMAGE_TAG} -f Backend/Dockerfile Backend
            docker tag ${env.BACKEND_IMAGE}:${env.IMAGE_TAG} ${env.BACKEND_IMAGE}:latest

            Write-Host "Building frontend image..."
            docker build -t ${env.FRONTEND_IMAGE}:${env.IMAGE_TAG} -f Frontend/Dockerfile Frontend
            docker tag ${env.FRONTEND_IMAGE}:${env.IMAGE_TAG} ${env.FRONTEND_IMAGE}:latest

            Write-Host "Pushing images..."
            docker push ${env.BACKEND_IMAGE}:${env.IMAGE_TAG}
            docker push ${env.BACKEND_IMAGE}:latest
            docker push ${env.FRONTEND_IMAGE}:${env.IMAGE_TAG}
            docker push ${env.FRONTEND_IMAGE}:latest

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
