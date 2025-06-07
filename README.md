# Fallout Alabama

This project contains a small web application themed around the **Fallout Adventures of Alabama** series.  It consists of static pages located in `frontend/` and a few Node based API endpoints used to manage player data.

## Running the API locally

The API files under `api/` are written as serverless functions.  The easiest way to run them is with the [Vercel CLI](https://vercel.com/docs/cli).  After installing it you can start a local development server:

```bash
npm install     # installs any dependencies
npx vercel dev  # serves the frontend and API
```

Opening the development address in your browser will load the pages from `frontend/` and requests to `/api/*` will invoke the functions from `api/` or `backend/` as configured in `vercel.json`.

## Running tests

The repository contains a small test suite for the character API.  Execute it with:

```bash
npm test
```

## Deployment

Deployment is done through Vercel.  Running `npx vercel` (and following the prompts) will upload the code and configure the rewrites defined in `vercel.json`.  Once deployed the static files and serverless functions will be served from the generated URL.

## Player data persistence

The helper module `backend/data/players.js` copies `players.json` to a file in
the operating system's temporary directory. API routes mutate this temporary
copy so that the original JSON remains unchanged. Because Vercel serverless
functions are stateless, the temporary file is recreated for each invocation and
whenever a new deployment occurs. Any modifications made through the API are
therefore lost between invocations.

For persistent player data consider connecting the API to an external data store
such as a database or Vercel KV/Edge Config.

