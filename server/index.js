const bodyParser = require('body-parser');
const jwt = require("jwt-simple");
const auth = require("./auth.js")();
const users = require("./users.js");
const cfg = require("./config.js");

module.exports = function (app) {

  app.use(bodyParser.urlencoded({ extended: true }));


  app.route('/api/secrets', auth.authenticate())
  .get(function (req, res) {
    return res.status(200).send({
      data: [
        { id: 1, type: 'secrets', attributes: { description: 'Your secret data from API' } }
      ]
    });
  });

  app.post("/token", function (req, res) {
    // debugger
    if (req.body.username && req.body.password) {
      var username = req.body.username;
      var password = req.body.password;
      var user = users.find(function (u) {
        return u.username === username && u.password === password;
      });
      if (user) {
        var payload = {
          id: user.id
        };
        var token = jwt.encode(payload, cfg.jwtSecret);
        res.json({
          access_token: token
        });
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  });

};
