FROM node:20.5.1-alpine3.18 as development

WORKDIR /services/accounting/app

# Copy configuration files
COPY ["services/accounting/tsconfig*.json", "services/accounting/package*.json", "./"]
COPY services/accounting/.env.docker .env

COPY ./lib/schema-regestry ../../lib/schema-regestry
# Install dependencies from package-lock.json, see https://docs.npmjs.com/cli/v7/commands/npm-ci
RUN npm ci

# Copy application sources (.ts, .tsx, js)
COPY services/accounting/prisma prisma/
COPY services/accounting/src/ src/

RUN npx prisma generate

# Build application (produces dist/ folder)
CMD ["npm", "run", "start"]
