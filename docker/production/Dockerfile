ARG IMAGE=node:22-alpine
###################
# BUILD FOR LOCAL DEPENDENCIES
###################
FROM $IMAGE AS deps
WORKDIR /home/node
RUN apk add --no-cache libc6-compat python3 make g++
COPY package.json pnpm-lock.yaml ./
RUN npm config set registry https://registry.npmjs.org/ && \
    npm install -g pnpm
RUN pnpm install --frozen-lockfile
###################
# BUILD FOR PRODUCTION
###################
FROM $IMAGE AS builder
WORKDIR /home/node
RUN npm install -g pnpm
COPY --from=deps /home/node/node_modules ./node_modules
COPY . .
COPY .env.production.sample .env.production
RUN pnpm run build
###################
# PRODUCTION
###################
FROM $IMAGE AS runner
WORKDIR /home/node
ENV NODE_ENV=production
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001
COPY --from=builder /home/node/public ./public
COPY --from=builder --chown=nextjs:nodejs /home/node/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /home/node/.next/static ./.next/static
USER nextjs
ARG PORT=3000
ENV PORT=$PORT
EXPOSE $PORT
CMD ["node", "server.js"]