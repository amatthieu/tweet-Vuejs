# Node server

A REST server built with NodeJs for tweets.

## Use it

`node app.js` and the server will be listening.

## REST services

The server is listening on port `3000`

Here are the webservices :

* `GET /getMessages`
* `GET /getMessages/:id`
* `GET /getComments/:id`
* `GET /gravatarUrl?mail`
* `POST /sendMessage`
* `POST /sendMessage/:id`

The `message` object :

``` JSON
{
  _id: 0,
  mail: "",
  gravatarUrl: "",
  msg: "",
  userName: "",
  sendDate: "",
  comments: []
}
```
