# syntax=docker/dockerfile:1

FROM node:24-bookworm-slim AS builder
WORKDIR /src
COPY . .
RUN npm ci --ignore-scripts && npx patch-package
RUN npm run build

FROM node:24-alpine AS runtime
WORKDIR /opt/keybr

RUN mkdir -p /var/lib/keybr && chown node:node /var/lib/keybr

COPY --from=builder --chown=node:node /src/root/index.js /src/root/_config.js ./
COPY --from=builder --chown=node:node /src/root/lib ./lib
COPY --from=builder --chown=node:node /src/root/public ./public

ENV NODE_ENV=production
ENV DATA_DIR=/var/lib/keybr
ENV APP_URL=http://localhost:3000/
ENV COOKIE_DOMAIN=localhost
ENV COOKIE_SECURE=false
ENV SERVER_PORT=3000

USER node
EXPOSE 3000
CMD ["node", "index.js"]
