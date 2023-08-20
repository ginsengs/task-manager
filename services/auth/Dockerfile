FROM node:20.5.1-alpine3.18 as development

WORKDIR /services/auth/app

# Copy configuration files
COPY ["./services/auth/tsconfig*.json", "./services/auth/package*.json", "./"]
COPY ./services/auth/.env.docker .env

# Install dependencies from package-lock.json, see https://docs.npmjs.com/cli/v7/commands/npm-ci
COPY ./lib/schema-regestry ../../lib/schema-regestry
RUN npm ci

# Copy application sources (.ts, .tsx, js)
COPY ./services/auth/prisma prisma/
COPY ./services/auth/src/ src/

RUN npx prisma generate

# Build application (produces dist/ folder)
CMD ["npm", "run", "start"]
