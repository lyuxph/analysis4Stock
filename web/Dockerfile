FROM node:18.16.1
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
WORKDIR /usr/src/web
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start"]
