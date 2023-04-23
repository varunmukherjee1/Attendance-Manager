FROM node:alpine

WORKDIR /usr/src/backend

COPY  package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm","start"]

# docker build -t api .
# docker run -p 5000:5000 api
