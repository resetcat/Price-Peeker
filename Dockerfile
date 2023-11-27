# Use the official Puppeteer Docker image
FROM ghcr.io/puppeteer/puppeteer:21.4.1

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock (or package-lock.json if using npm)
COPY package.json .
COPY package-lock.json .

# Switch to root user to avoid permission issues
USER root

# Install dependencies
RUN npm install 



# Copy your application source
COPY . .

# Build the application (if necessary)
RUN npm run build

# Switch back to pptruser
USER pptruser

# Expose the port your app runs on
EXPOSE 3080

# Start the application
CMD ["node", "dist/main"]
