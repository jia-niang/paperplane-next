FROM paperplanecc/baseline-node20:2025.11.30

ARG NPM_REGISTRY=https://registry.npmjs.org

EXPOSE 3000
WORKDIR /paperplane-next

ENV NODE_ENV=production
ENV DO_NOT_TRACK=1

RUN apt-get update -y && apt-get install -y openssl

COPY .docker-deps /paperplane-next
RUN --mount=type=cache,id=pnpm,target=/paperplane-next/.pnpm-store pnpm i --frozen-lockfile --store-dir /paperplane-next/.pnpm-store --registry=$NPM_REGISTRY

COPY . /paperplane-next/
RUN pnpm run db:gen
RUN pnpm run build:prod

CMD [ "pnpm", "run", "start:prod" ]
