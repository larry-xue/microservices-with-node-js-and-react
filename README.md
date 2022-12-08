# Intro

## technical stacks

- Typescript
- Express.js
- Next.js
- MongoDB
- Jest
- Docker
- K8s
- Skaffold

## prerequire

In order to run this project, you should install Docker, and enable Kubernetes inside Docker, and install Skaffold as a tool of managing pods.

## RUN

```bash
cd ticketing
skaffold dev --no-prune=false --cache-artifacts=false
```
