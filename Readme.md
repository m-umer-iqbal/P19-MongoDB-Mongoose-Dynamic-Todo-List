# Dynamic Todo List

A dynamic multi-list todo application built with Node.js, Express, MongoDB, and EJS templating.

## Features

- **Multiple Lists**: Create unlimited todo lists by simply visiting `/[list-name]`
- **Daily Default List**: Automatically shows today's date as the default list
- **Persistent Storage**: All lists and items are stored in MongoDB
- **Simple CRUD Operations**: Add and delete items from any list
- **Dynamic Routing**: Custom lists are created on-the-fly when first visited

## How It Works

1. **Homepage** (`/`): Displays today's date list with existing items
2. **Custom Lists** (`/:slug`): Visit any URL like `/Work` or `/Shopping` to create/view lists
3. **Add Items**: Submit items through the form - they're added to the current list
4. **Delete Items**: Check off items to remove them from the list

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Templating**: EJS
- **Styling**: Custom CSS

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start MongoDB service
4. Run the app: `node app.js`
5. Visit `http://localhost:3000`

The app automatically initializes with today's list and allows instant creation of new lists through URL navigation.