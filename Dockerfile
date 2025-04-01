FROM node:22.9.0-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

RUN yarn install --frozen-lockfile --production

FROM gcr.io/distroless/nodejs22

WORKDIR /app

ARG NODE_ENV=production
ARG PORT=3000

ENV NODE_ENV=$NODE_ENV
ENV PORT=$PORT

COPY --chown=1000:1000 --from=builder /app/node_modules ./node_modules
COPY --chown=1000:1000 --from=builder /app/dist ./dist
COPY --chown=1000:1000 --from=builder /app/healthcheck.js ./healthcheck.js

# Optionally, copy other necessary files (e.g., configuration)
# COPY --chown=1000:1000 --from=builder /app/.env ./

EXPOSE $PORT

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD ["/nodejs/bin/node", "healthcheck.js"]

USER 1000:1000

CMD ["dist/main.js"]