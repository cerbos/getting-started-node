# Getting Started - Node.js

An example application of integrating [Cerbos](https://cerbos.dev) with an [Express](https://expressjs.com/) server.

<a href="https://www.youtube.com/watch?v=caqUh6i3vVQ" target="_blank"><img src="docs/video.png" /></a>

- [Try online with the Cerbos playground](https://play.cerbos.dev)
- [Explore demo repositories](https://github.com/cerbos)
- [Read the documentation](https://docs.cerbos.dev)
- [Subscribe to our newsletter](https://cerbos.dev/subscribe)
- [Join the community on Slack](http://go.cerbos.io/slack)

## Dependencies

- Node.js v18+
- Docker for running the [Cerbos Policy Decision Point (PDP)](https://docs.cerbos.dev/cerbos/latest/installation/container)

## Getting Started

1. Start up the Cerbos PDP instance docker container. This will be called by the Express app to check authorization.

```bash
cd cerbos
./start.sh
```

2. Install node dependencies

```bash
npm install
```

3. Start the Express server

```bash
npm run start
```

## How it works

This example uses [`@cerbos/grpc`](https://www.npmjs.com/package/@cerbos/grpc) to communicate with the Cerbos PDP over gRPC.

The Express server exposes three endpoints for managing articles:

- `GET /article/:id` - Read an article
- `PATCH /article/:id` - Update an article
- `DELETE /article/:id` - Delete an article

Each endpoint calls `cerbos.checkResource()` to determine if the current user is authorized to perform the requested action based on the policies defined in the `cerbos/policies` directory.

The Cerbos policy (`cerbos/policies/article.yaml`) defines the following rules:

- **Admin** and **User** roles can `read` and `create` articles
- **Admin** role can `update` and `delete` any article
- **User** role can only `update` and `delete` articles they own
