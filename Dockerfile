FROM node:10-alpine


ENV HOST 0.0.0.0

WORKDIR /home/node/app

COPY . .

RUN npm install

EXPOSE 3000
#CMD npm start

#example run command docker run -p 3000:3000 -v ./assignments:/assignments -v solutions:/home/node/solutions -v releases:/releases app
