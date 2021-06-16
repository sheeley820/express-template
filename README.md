# Node.js / Express.js Template
This is a template for Node.js and Express, utilizing MongoDB, with testing by Jest and JSDOM.

## Setup
The application is started with `npm start`.

Running the application requires a `.env` file with the following values defined:
```
    TARGET_COLLECTION
    PORT //Will default to 3000 if not defined
    MONGO_URL
    DB_NAME
```

## Testing
Tests are run with `npm test`.

This project demonstrates how tests can be written for the API component, the HTML, the CSS and client side JavaScript.