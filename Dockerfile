FROM node:13.3.0

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Copying source files
COPY . .

#get the backend address
ARG BACKEND_ADDRESS=http://localhost:8081/
#set the backend address
RUN sed -i 's@^    baseURL:.*@    baseURL:'\'"$BACKEND_ADDRESS"\''@' webservice/axios-dataSets.js

# Installing dependencies
RUN npm install

# Building app
RUN npm run build

# Running the app
CMD [ "npm", "start" ]