const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/github', passport.authenticate('github'));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.send(`You are logged in as ${req.user.displayName}. <a href="/auth/logout">Logout</a>`);
  }
);

router.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Logged in as ${req.user.displayName}. <a href="/auth/logout">Logout</a>`);
  } else {
    res.send('You are logged out. <a href="/auth/github">Login with GitHub</a>');
  }
});

// Logout route
router.get('/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        console.error('Error during logout:', err);
      }
      res.redirect('/');
    });
  });
  

module.exports = router;
