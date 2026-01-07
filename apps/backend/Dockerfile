FROM node:22-alpine
WORKDIR /app

COPY package*.json tsconfig*.json ./
COPY apps/backend/package.json ./apps/backend/
COPY domain-core/package.json ./domain-core/

RUN npm install

COPY domain-core/ ./domain-core/
COPY apps/backend/ ./apps/backend/

WORKDIR /app/domain-core
RUN npx tsc --project tsconfig.json

WORKDIR /app/apps/backend
RUN npx tsc --project tsconfig.json

EXPOSE 3000
CMD ["node", "dist/index.js"]