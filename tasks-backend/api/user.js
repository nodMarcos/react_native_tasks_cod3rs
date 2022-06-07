const bcrypt = require('bcrypt-nodejs');

module.exports = app => {
  const hashPassword = (password, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, null, (err, hash) => {
        callback(hash);
      });
    })
  }

  const save = (req, res) => {
    hashPassword(req.body.password, hash => {
      const password = hash;
      
      app.db('users')
        .insert({name: req.body.name, email: req.body.email, password})
        .then(_ => res.status(204).send())
        .catch(err => res.status(400).json(err));
    })
}

  return { save }
} // fim do module.exports