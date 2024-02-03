const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    // User is logged in
    res.send(`Logged in as ${req.user.displayName}. <a href="/auth/logout">Logout</a>`);
  } else {
    // User is logged out
    res.send('You are logged out. <a href="/auth/login">Login</a>');
  }
});

module.exports = router;
