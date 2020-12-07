# define image to build from Docker 
# use the latest LTS (long term support) version 12 of node available from the Docker Hub 
FROM node:12 

# create app directory 
WORKDIR /app 

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# install dependencies 
RUN npm install 

# bundle app source 
COPY . . 

# declare port 
ENV PORT=8080

# expose port mapped by the docker daemon
EXPOSE 8080 

# run file
CMD [ "npm", "start" ]  