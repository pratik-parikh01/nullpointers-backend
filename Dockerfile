# Use the official Node.js 20.13.1 image as the base
FROM node:20.13.1

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 8081 to the host
EXPOSE 8083

# Start the application
CMD ["npm", "start"]