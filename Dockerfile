# Stage 1: Build React App
FROM node:18 AS build-frontend

WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Stage 2: Backend + Serve frontend
FROM node:18

# Create app directory
WORKDIR /app

# Copy backend files
COPY server/package*.json ./
RUN npm install
COPY server/ ./

# Copy built React files into backend's public directory
COPY --from=build-frontend /app/client/build ./public

# Expose the port your server runs on
EXPOSE 3000

# Start your server (make sure your Express app serves static files from ./public)
CMD ["node", "index.js"]