FROM node:22-alpine
WORKDIR /app

COPY package.json ./
COPY apps/backend/package.json ./apps/backend/
COPY domain-core/package.json ./domain-core/

RUN npm install

COPY domain-core/ ./domain-core/
COPY apps/backend/ ./apps/backend/

WORKDIR /app/apps/backend
EXPOSE 3000
CMD ["npm", "run", "dev"]