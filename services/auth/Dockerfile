FROM node:20.5.1-alpine3.18 as development

WORKDIR /app

# Copy configuration files
COPY ["tsconfig*.json", "package*.json", ".env", "./"]

# Install dependencies from package-lock.json, see https://docs.npmjs.com/cli/v7/commands/npm-ci
RUN npm ci

# Copy application sources (.ts, .tsx, js)
COPY prisma prisma/
COPY src/ src/

RUN npx prisma generate

# Build application (produces dist/ folder)
CMD ["npm", "run", "start"]
