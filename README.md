# Am I Nice?

<img align="right" width="120" title="Am I Nice? logo" src="./public/images/logo.png">

A single page app which analyses your Facebook posts using Google's Natural Language API.

**This was created during my time as a student at Code Chrysalis.**

## How It Works

A user authenticates with Facebook and connects to a Facebook App. Their user posts are downloaded, and uploaded to Google Cloud Natural Language for analysis. The results are the visualised using d3.js.

## Getting Started

First, fork and clone this repository:

```sh
$ git clone https://github.com/[username]/am-i-nice.git
```

Then, run yarn to initialise the repository:

```sh
$ yarn
```

You will now be able to load the application. However, it won't be usable without some configuration.

### Create a Facebook App

You can [create a Facebook App](https://developers.facebook.com/docs/apps/register) for free. Once you've created an App, you'll need the app ID. Change the variable named `FB_APP_ID` in `./public/scripts/helpers.js` to match your own ID.

### Add HTTPS certificates

[Add an HTTPS certificate and key](https://devcenter.heroku.com/articles/ssl-certificate-self) to `./server` to allow the Facebook API to work:

```
certificate: ./server/cert.pem
key: ./server/key.pem
```

### Sign up for Google Cloud Natural Language API

You can sign up [here](https://cloud.google.com/natural-language/). After you sign up for access to the Natural Language API, you'll receive credentials as `GOOGLE_CREDENTIALS.json`. You'll need to set two environment variables using the data contained in your own credentials file:

```
GOOGLE_PRIVATE_KEY: private_key
GOOGLE_CLIENT_EMAIL: client_email
```

## Starting the App

You can now start the application:

```sh
$ yarn dev
```

You can view the application running at https://localhost:3000/.

If you wish to build a copy of the App which runs without needing `babel`:

```sh
$ yarn build
$ yarn start
```

To remove an old build:

```sh
yarn clean
```

## Testing

Tests are written using `mocha`, `chai`, and `sinon`.

Start the tests by opening `./testrunner.html` in your browser.

## Contributing

Please feel free to contribute to this repository. Make a pull request!
