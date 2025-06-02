# Etapa 1 - Build
FROM node:18 AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
COPY . .

RUN npm install
RUN npm run build

# Etapa 2 - Produção
FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app ./

# Expõe a porta padrão do Next.js (pode ser configurada)
EXPOSE 3000

CMD ["npm", "run", "start"]
