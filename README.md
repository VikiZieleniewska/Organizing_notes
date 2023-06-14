# Organizing Notes

This is a simple application for organizing notes. It uses a fake API and Vite as the development server. Follow the steps below to run the application.

## Prerequisites

Make sure you have the following software installed on your system:

- Node.js (version 14 or later)

## Installation

1. Clone the repository to your local machine.

   `git clone <repository-url>`

2. Navigate to the project directory.

   `cd organizing-notes`

3. Install the dependencies.

   `npm install`

## Starting the Fake API Server

The application uses a fake API server powered by JSON Server. To start the fake API server, run the following command:

`npm run api`

This command will start the server and watch the db.json file for any changes.
Open to view it in your browser:

HOME
http://localhost:3000

Resources
http://localhost:3000/notes
http://localhost:3000/categories

The page will reload when you make changes.

## Starting the Development Server

To start the development server powered by Vite, run the following command:

`npm run dev`

This command will start the Vite development server and automatically open the application in your default browser.

Open http://localhost:5173 to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

## Building the Application

If you want to build the application for production, you can run the following command:

`npm run build`

This command will create an optimized build of the application in the dist directory.

## Linting

To lint the source code using ESLint, run the following command:

`npm run lint`

This command will check the source code for any linting errors or warnings.

## Previewing the Production Build

If you want to preview the production build locally, you can run the following command:

`npm run preview`

This command will serve the production build of the application locally for previewing.

That's it! You should now have the application up and running using the fake API and Vite development server. Feel free to explore and organize your notes.
