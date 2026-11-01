# CSCI 3172 Lab 3 - Harbor Roast REST API

Harbor Roast is a specialty coffee-shop menu API built with Node.js and Express.
It supports listing, reading, creating, and deleting menu items, with custom
request logging, POST payload validation, and centralized error handling.
A small companion frontend is included for Netlify (or local static preview).

* Date Created: 01 Nov 2026
* Last Modification Date: 01 Nov 2026
* Student Name: Tushant Kaura
* Banner Number (B00): B01017760
* CSID: kaura
* Lab Render URL (backend): [PASTE YOUR RENDER URL HERE, e.g. https://harbor-roast-api.onrender.com]
* Lab Netlify URL (frontend): [PASTE YOUR NETLIFY URL HERE, e.g. https://harbor-roast.netlify.app]
* Lab GitLab URL: https://git.cs.dal.ca/kaura/csci3172
* Local API: http://localhost:3000


## Authors

* [Tushant Kaura](ts649022@dal.ca) - Student developer


## Built With

* [Node.js](https://nodejs.org/) - JavaScript runtime for the backend
* [Express](https://expressjs.com/) - Web framework for REST routes and middleware
* [cors](https://www.npmjs.com/package/cors) - Cross-origin access for the Netlify frontend
* [Render](https://render.com/) - Hosting for the Express API
* [Netlify](https://www.netlify.com/) - Hosting for the static frontend in /public


## Project Structure

Lab3/
  server.js                 Express app entry point
  package.json              Dependencies and start scripts
  data/items.js             In-memory menu store and helpers
  middleware/logger.js      Custom request logging middleware
  middleware/validateItem.js  POST body validation middleware
  middleware/notFound.js    404 route handler
  middleware/errorHandler.js  Centralized error middleware
  routes/items.js           GET/POST/DELETE item routes
  public/                   Frontend for Netlify / local static use
  README.txt                This documentation file


## API Endpoints

* GET    /api/items      - return all menu items
* GET    /api/items/:id  - return one item by id
* POST   /api/items      - create a new item from JSON
* DELETE /api/items/:id  - delete an item by id

Required POST fields:
* name (non-empty string)
* category (non-empty string)
* price (number >= 0)
* caffeineMg (number >= 0)
* available (boolean)
Optional:
* description (string)


## How to Run Locally

1. cd Lab3
2. npm install
3. npm start
4. Open http://localhost:3000 for the API welcome JSON
5. Open http://localhost:3000/index.html for the companion UI

Example create request:
  curl -X POST http://localhost:3000/api/items \
    -H "Content-Type: application/json" \
    -d '{"name":"Cedar Flat White","category":"Espresso","price":4.5,"caffeineMg":120,"available":true,"description":"Silky and bright"}'


## Deployment Notes

Render (backend):
* Root Directory: Lab3 (if deploying from the course monorepo)
* Build Command: npm install
* Start Command: node server.js

Netlify (frontend):
* Publish directory: Lab3/public
* After Render is live, open the Netlify site with:
  https://YOUR-NETLIFY-SITE.netlify.app/?api=https://YOUR-RENDER-URL
  or set window.API_BASE in the browser console / a small config snippet.


## Sources Used

No third-party application code was copied into this lab.
Framework usage follows the official Express and Node.js documentation only.


## Artificial Intelligence Tools Used

* [Cursor](https://cursor.com/) - Used while drafting the Express project layout,
  middleware structure, companion UI, and this README.

### Prompt Used on Cursor

```
Complete CSCI 3172 Lab 3 from the instructions PDF: build an Express REST API
with GET/POST/DELETE endpoints, custom logging middleware, payload validation,
centralized error handling, and a small frontend for Netlify/Render deployment.
```

The assistant helped scaffold the modular folder layout and documentation.
I reviewed, edited, and tested the code myself before submission.


## Acknowledgments

* CSCI 3172 Lab 3 handout (Fall 2026)
* Express documentation for middleware and routing patterns
