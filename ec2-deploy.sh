#!/bin/bash
# EC2 Deployment Script - Run this on your EC2 instance

echo "========================================="
echo "RevCart EC2 Deployment Script"
echo "========================================="

# Create project directory
mkdir -p ~/revcart
cd ~/revcart

# Create docker-compose.yml
cat > docker-compose.yml <<'EOF'
version: "3.8"

services:
  mysql:
    image: mysql:8.0
    container_name: revcart-mysql
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: revcart
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
    restart: unless-stopped

  mongodb:
    image: mongo:7
    container_name: revcart-mongodb
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
    restart: unless-stopped

  backend:
    image: amanpardeshi01/revcart-backend:latest
    container_name: revcart-backend
    networks:
      default:
        aliases:
          - backend
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: "jdbc:mysql://mysql:3306/revcart?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true"
      SPRING_DATASOURCE_USERNAME: "root"
      SPRING_DATASOURCE_PASSWORD: "root"
      SPRING_DATA_MONGODB_URI: "mongodb://mongodb:27017/revcart_logs"
      REVCART_SECURITY_JWT_SECRET: "ChangeMeToAStrongSecretKeyForRevCartBackend123456"
      REVCART_SECURITY_JWT_EXPIRATION_MS: "86400000"
    depends_on:
      - mysql
      - mongodb
    restart: unless-stopped

  frontend:
    image: amanpardeshi01/revcart-frontend:latest
    container_name: revcart-frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: unless-stopped

volumes:
  mysql_data:
  mongo_data:
EOF

echo "Pulling latest images from Docker Hub..."
docker-compose pull

echo "Starting services..."
docker-compose up -d

echo "Waiting for services to start..."
sleep 30

echo "Checking service status..."
docker-compose ps

echo ""
echo "========================================="
echo "Deployment complete!"
echo "Frontend: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)"
echo "Backend:  http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):8080"
echo "========================================="
echo ""
echo "To view logs: docker-compose logs -f"
echo "To restart:   docker-compose restart"
echo "To stop:      docker-compose down"


backend:
  image: amanpardeshi01/revcart-backend:latest
  container_name: revcart-backend
  ports:
    - "8080:8080"
  environment:
    SPRING_DATASOURCE_URL: "jdbc:mysql://mysql:3306/revcart?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true"
    SPRING_DATASOURCE_USERNAME: "root"
    SPRING_DATASOURCE_PASSWORD: "root"
    SPRING_DATA_MONGODB_URI: "mongodb://mongodb:27017/revcart_logs"
    REVCART_SECURITY_JWT_SECRET: "ChangeMeToAStrongSecretKeyForRevCartBackend123456"
    REVCART_SECURITY_JWT_EXPIRATION_MS: "86400000"
    SPRING_MAIL_HOST: "smtp.gmail.com"
    SPRING_MAIL_PORT: "587"
    SPRING_MAIL_USERNAME: "amanpardeshi541@gmail.com"
    SPRING_MAIL_PASSWORD: "gyzf eqyc glzy ybkz"
    SPRING_MAIL_PROPERTIES_MAIL_SMTP_STARTTLS_ENABLE: "true"
  depends_on:
    - mysql
    - mongodb
  restart: unless-stopped
  
