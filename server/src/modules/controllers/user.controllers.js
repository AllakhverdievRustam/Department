const Users = require('../../db/models/user/Index');

module.exports.getAllUsers = (req, res) => {
  Users.find().then(result => {
    res.send({ data: result });
  });
};

module.exports.getOneUser = (req, res) => {
  const { query } = req;
  const { _id } = query;

  if (query.hasOwnProperty('_id') && _id) {
    Users.findOne({ _id }).then(result => {
      res.send({ data: result });
    });
  } else {
    res.status(422).send('Invalid data entered!');
  }
};

module.exports.addNewUser = (req, res) => {
  const { body } = req;
  const { firstName, lastNamem, logit, password, email } = body;

  if (body.hasOwnProperty('firstName')
    && body.hasOwnProperty('lastNamem')
    && body.hasOwnProperty('logit')
    && body.hasOwnProperty('password')
    && body.hasOwnProperty('email')
    && firstName
    && lastNamem
    && logit
    && password
    && email) {
      const users = new Users(body);

      users.save().then(() => {
        Users.find().then(result => {
          res.send({ data: result });
        });
      });
  } else {
    res.status(422).send('Invalid data entered!');
  }
};

module.exports.editUser = (req, res) => {
  const { body } = req;
  const { firstName, lastNamem, logit, password, email, _id } = body;

  if (body.hasOwnProperty('firstName')
    && body.hasOwnProperty('lastNamem')
    && body.hasOwnProperty('logit')
    && body.hasOwnProperty('password')
    && body.hasOwnProperty('email')
    && body.hasOwnProperty('_id')
    && firstName
    && lastNamem
    && logit
    && password
    && email
    && _id) {

      Users.updateOne({ _id }, body).then(() => {
        Users.find().then(result => {
          res.send({ data: result });
        });
      });
  } else {
    res.status(422).send('Invalid data entered!');
  }
};

module.exports.deleteUser = (req, res) => {
  const { query } = req;
  const { _id } = query;

  if (query.hasOwnProperty('_id') && _id) {
    Users.deleteOne({ _id }).then(() => {
      Users.find().then(result => {
        res.send({ data: result });
      });
    });
  } else {
    res.status(422).send('Invalid data entered!');
  }
};