# Use a node image as the base
FROM node:16

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the root dependencies (if you have a monorepo or shared dependencies)
RUN npm install

# Copy the rest of the application code
COPY . .

# Install backend dependencies
WORKDIR /app/backend
RUN npm install

# Install frontend dependencies
WORKDIR /app/frontend
RUN npm install

# Go back to the root directory
WORKDIR /app

# Start the application (run both frontend and backend concurrently)
CMD ["npm", "start"]
