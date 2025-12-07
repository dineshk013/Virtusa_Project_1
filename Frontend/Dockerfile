# Frontend/Dockerfile
# Build stage
FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci --no-audit --no-fund
COPY . .
# build production artifacts
RUN npm run build -- --configuration=production || npm run build

# Runtime stage (nginx) — copy browser output
FROM nginx:alpine AS runtime

# Remove default nginx html
RUN rm -rf /usr/share/nginx/html/*

# Copy the Angular browser build into nginx root
COPY --from=build /app/dist/frontend/browser/ /usr/share/nginx/html/

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
