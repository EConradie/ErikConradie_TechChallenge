# Dockerfile
FROM node:25

# Create app directory
WORKDIR /app

# Copy package manifests first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the project
COPY . .

# Expose your app port
EXPOSE 5000

# Wait for DB a little, then run dev server.
# Using a short sleep mitigates race where node starts before Postgres is accepting connections.
CMD ["sh", "-c", "sleep 4 && npm run dev"]
