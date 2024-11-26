FROM node:latest

# Set work directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Expose port and start application
EXPOSE 3000
CMD ["npm", "run", "dev"]
