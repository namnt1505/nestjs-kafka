###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:22.15.0-alpine3.20 AS development

WORKDIR /usr/src/app

COPY --chown=node:node package.json ./

RUN npm install -g pnpm --force

RUN pnpm install

COPY --chown=node:node . .

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:22.15.0-alpine3.20 AS build

WORKDIR /usr/src/app

COPY --chown=node:node package.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=development /usr/src/app/pnpm-lock.yaml ./

COPY --chown=node:node . .

RUN npm install -g pnpm --force
RUN pnpm build

ENV NODE_ENV production

RUN pnpm install --only=production

USER node

###################
# PRODUCTION
###################

FROM node:22.15.0-alpine3.20 AS production

WORKDIR /usr/src/app
# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# Start the server using the production build
CMD [ "node", "./dist/main.js" ]