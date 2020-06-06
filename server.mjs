import 'dotenv/config.js';
import {resolve} from 'path';
import express from 'express';
import Cookies from 'cookies';
import GitHubAuthentication from '@authentication/github';


const app = express();

const gitHubAuthentication = new GitHubAuthentication({
  callbackURL: '/__/auth/github',
});
app.get('/', (req, res, next) => {
  const accessToken = new Cookies(req, res).get('access_token');
  if (accessToken) {
    return res.sendFile(resolve('build/index.html'));
  } else {
    gitHubAuthentication.redirectToProvider(req, res, next, {
      // you can pass some abritrary state through to the callback here
      state: {url: req.url},
      scope: ['read:user', 'read:org'],
    });
  }
})

app.get(gitHubAuthentication.callbackPath, async (req, res, next) => {
  try {
    if (gitHubAuthentication.userCancelledLogin(req)) {
      return res.redirect('/');
    }
    const {accessToken, state} = await gitHubAuthentication.completeAuthentication(req, res);
    new Cookies(req, res).set('access_token', accessToken, {httpOnly: false});
    res.redirect(state.url);
  } catch (ex) {
    next(ex);
  }
});
app.use(express.static('build', {
  maxAge: 30 * 24 * 60 * 60 * 1000,
}))

app.listen(process.env.PORT || 3000);