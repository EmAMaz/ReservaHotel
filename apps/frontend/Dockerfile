FROM node:22-alpine AS build-stage
WORKDIR /app

COPY package.json ./
COPY apps/frontend/package.json ./apps/frontend/

RUN npm install

COPY apps/frontend/ ./apps/frontend/

WORKDIR apps/frontend
RUN npm run build

FROM nginx:stable-alpine AS production-stage

COPY --from=build-stage /app/apps/frontend/dist /usr/share/nginx/html

COPY apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]