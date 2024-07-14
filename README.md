# Tooling Data Explorer/Dashboard

## The Problem

Design and develop an explorer or dashboard that fetches data from RPC and/or API sources. The UI should offer a clear and easy-to-use experience for a broad range of users.

- Data Fetching: Retrieve data from RPC and/or API endpoints.

- User Experience: Create an intuitive and user-friendly interface.

- Deployment: Ensure the explorer or dashboard can be tested and deployed on Cloudflare or Vercel.

## Demo video

```
https://www.loom.com/share/813892b4193a47358d46ff30e90d6c72
```

## Proposed solution

This solution provides a fully integrated platform for retrieving and searching transactions across the Solana network. It features a beautiful UI with animations for visualizing data. Multiple UI and API routes are available to access the necessary information, including the current price of Solana.

## Technologies

- NextJs App Routing(v14)
- Typescript
- Tailwind
- Zustand
- Solana/Web3
- Pnpm

## Characteristics of this solution

- Fully typed solution
- Standardized(Atomic) components across the platform
- Dark/Light theme integration
- Modularized and well-organized code structure
- Accessibility compliance
- Fully responsive design
- Harmonious design
- Real-time data fetching
- Ready for future feature enhancements
- Easy integration with Vercel and similar platforms
- Multiple routes and api endpoints

## Install dependencies

```shell
pnpm install
```

## Configure environment variables

```shell
cp .env.example .env
vim .env
```

## Project Structure

```

/src
  env.mjs            - Contains all variables typed for platform
  constants.ts       - Any global variable for app, like APP_NAME
  /app               - Contains all API and UI routes, integrated using the new Next.js version
  /components/ui     - Houses all standardized atomic components
  /modules           - Each platform topic is organized into a specific folder
    /some-module
      /components    - Contains components specific to that topic
      /utils         - Contains utilities specific to that topic
      /data          - Contains data specific to that topic
      /store         - Contains state management for that topic
      /types         - Contains type definitions for that topic
```

Set the values of the environment variables in the .env file. Currently, there are no values, but this setup will allow for easy configuration in the future. Ensure integration with src/env.mjs for proper typing.

## Routes

The site includes multiple routes to provide comprehensive access to Solana network data:

- /blocks: Displays information about Solana blocks.
- /transactions: Shows a list of transactions.
- /: The main route, featuring a dashboard with all the current information about the Solana network.
- /transactions/[signature]: Displays detailed information about a specific transaction based on its signature.
  This solution offers everything needed to explore the Solana blockchain thoroughly.
- /api/block-information: Get endpoint to retrieve a block information
- /api/latest-blocks: Get endpoint to retrieve blocks paginated
- /api/latest-transactions: Get endpoint to retrieve transactions paginated
- /api/latest-transactions-graph: Get endpoint to retrieve structured data for graph display

## Running the project

Make sure you have your .env file correctly set up as mentioned in Configure environment variables section.
To run the project in development mode, use:

```sh
pnpm dev
```

This runs the dev script specified in our package.json and will start a server that reloads the page as files are saved. The server typically runs at http://localhost:3000.

## Creating a production build

To create a production build, run:

```sh
pnpm build
```

This will generate an optimized build in the ./dist directory.

To serve the production build, use:

```sh
pnpm start
```

This will start a server to view the production build.
