FROM node:latest
MAINTAINER Mike Godley <michaelgodley@gmail.com>

# create app dir in container
RUN mkdir -p /app/

# Set default working dir
WORKDIR /app/

# Copy package.json
# COPY .npmrc .
COPY package*.json ./

RUN npm install --quiet
# RUN npm install --only=production

# copy src files to container
COPY src ./src

# command to start service
CMD ["npm", "start"]
