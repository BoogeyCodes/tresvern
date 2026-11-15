# TresVern website

Single-page site for TresVern Software Solutions. The page is static (`public/index.html`) and is served by a small Node server with no dependencies.

## Run locally

```
npm start
```

Then open http://localhost:3000.

## Deploy to Railway

Railway detects Node and runs `npm start`. The server reads the port from `PORT`.

```
railway login
railway init
railway up
railway domain
```
