FROM node:18-alpine AS base

COPY . .
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm build

EXPOSE 3000
CMD ["node", "dist/index.js"]