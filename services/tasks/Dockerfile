FROM node:20.5.1-alpine3.18 as development

WORKDIR /services/tasks/app

# Copy configuration files
COPY ["./services/tasks/tsconfig*.json", "./services/tasks/package*.json", "./"]
COPY ./services/tasks/.env.docker .env

COPY ./lib/schema-regestry ../../lib/schema-regestry
# Install dependencies from package-lock.json, see https://docs.npmjs.com/cli/v7/commands/npm-ci
RUN npm ci

# Copy application sources (.ts, .tsx, js)
COPY ./services/tasks/prisma prisma/
COPY ./services/tasks/src/ src/

RUN npx prisma generate

# Build application (produces dist/ folder)
CMD ["npm", "run", "start"]
