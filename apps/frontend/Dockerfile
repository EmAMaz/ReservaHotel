FROM node:22-alpine
WORKDIR /app

COPY package.json ./
COPY apps/frontend/package.json ./apps/frontend/

RUN npm install

COPY apps/frontend/ ./apps/frontend/

WORKDIR /app/apps/frontend

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]