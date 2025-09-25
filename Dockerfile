FROM paperplanecc/baseline-node20:1.0.0

ARG NPM_REGISTRY=https://registry.npmjs.org

EXPOSE 3000
WORKDIR /paperplane-next

ENV NODE_ENV=production
ENV DO_NOT_TRACK=1

COPY .docker-deps /paperplane-next
RUN --mount=type=cache,id=pnpm,target=/paperplane-next/.pnpm-store pnpm i --frozen-lockfile --store-dir /paperplane-next/.pnpm-store --registry=$NPM_REGISTRY

COPY . /paperplane-next/
RUN pnpm run build

CMD [ "pnpm", "start:prod" ]
