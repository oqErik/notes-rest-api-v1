# Notes REST API
A simple but efficient Rest API for users to create personal notes <br>

I have uploaded the API to heroku and u can check at: [https://notes-rest-api-v1.herokuapp.com](https://notes-rest-api-v1.herokuapp.com)
## Installation 

1.- Dowload the repo locally

2.- Install the dependencies:
```
npm install
```

3.- Set the environment variables:


4.- Run locally:
```
node app
```
## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```
# Port number
PORT=3000

# URL of the Mongo DB
MONGODB_CNN=mongodb://127.0.0.1:27017/node-boilerplate

# JWT secret key
SECRETORPRIVATEKEY=thisisasamplesecret

```

## API Documentation

To view the list of available APIs and their specifications, run the server and go to `http://localhost:8080` in your browser. 

### API Endpoints

List of available routes:

**User routes**:\
`POST /api/users` - create new user\
`PUT  /api/users/:id` - update user\
`DEL  /api/users/:id` - delete user\
`POST /api/auth/login` - login

**Notes routes**:\
`GET  /api/notes/` - Get all notes from a user\
`GET  /api/notes/:id` - Get a note\
`POST /api/notes` - create new note\
`PUT  /api/notes/:id` - update note\
`DEL  /api/notes/:id` - delete note

**Search routes - Admins only**:\
`GET  /api/search/users` - Get all users\
`GET  /api/search/users/:id` - Get a users\
`GET  /api/search/users/:query` - Search users by their Name or Mail\
`GET  /api/search/notes` - Get all notes\
`GET  /api/search/notes/:id` - Get a note\
`GET  /api/search/notes/:query` - Search notes by their Title, Description or User
