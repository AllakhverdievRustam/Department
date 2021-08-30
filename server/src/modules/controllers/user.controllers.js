const Users = require('../../db/models/user/Index');

module.exports.getAllUsers = (req, res) => {
  try {
    Users.find().then(result => {
      if (!result.length) throw('No entries!');

      res.send({ data: result });
    });
  } catch (error) {
    res.status(422).send(error);
  }
};

module.exports.getUserById = async (req, res) => {
  const { query } = req;
  const { _id } = query;

  try {
    if (_id) {
      const candidate = await Users.findOne({ _id });
      if (!candidate) throw('User is not found!');

      Users.findOne({ _id }).then(result => {
        res.send({ data: result });
      });
    } else {
      throw('Invalid data entered!');
    }
  } catch (error) {
    res.status(422).send(error);
  }
};

module.exports.addNewUser = async (req, res) => {
  const { body } = req;
  const { firstName, lastName, password, email } = body;

  try {
    if (!firstName && !lastName && !password && !email) throw('Invalid data entered!');
    if (2 >= firstName.length || firstName.length > 50) throw('Too long field firstName!');
    if (2 >= lastName.length || lastName.length > 50) throw('Too long field lastName!');

    if (password.length < 6) {
      throw('Enter more than 6 characters in your password!');
    }
    if (!(/((?=.*[0-9])(?=.*[a-zA-Z]))/.test(password))) {
      throw('Use Latin letters and numbers in your password!');
    }

    if (!(/([a-zA-Z0-9]+(?:[._+-][a-zA-Z0-9]+)*)@([a-zA-Z0-9]+(?:[.-][a-zA-Z0-9]+)*[.][a-zA-Z]{2,})/.test(email))) {
      throw('Email validation error!');
    }

    const candidate = await Users.findOne({ email });
    if (candidate) throw('This user already exists!');

    const users = new Users(body);

    users.save().then(() => {
      res.send('User added successfully!');
    });
  } catch (error) {
    res.status(422).send(error);
  }
};

module.exports.updataUser = async (req, res) => {
  const { body } = req;
  const { firstName, lastName, password, email, _id } = body;

  try {
    const candidate = await Users.findOne({ _id });
    if (!candidate) throw('User is not found!');

    if (!firstName && !lastName && !password && !email) throw('Invalid data entered!');
    if (2 >= firstName.length || firstName.length > 50) throw('Too long field firstName!');
    if (2 >= lastName.length || lastName.length > 50) throw('Too long field lastName!');

    if (password.length < 6) {
      throw('Enter more than 6 characters in your password!');
    }
    if (!(/((?=.*[0-9])(?=.*[a-zA-Z]))/.test(password))) {
      throw('Use Latin letters and numbers in your password!');
    }

    if (!(/([a-zA-Z0-9]+(?:[._+-][a-zA-Z0-9]+)*)@([a-zA-Z0-9]+(?:[.-][a-zA-Z0-9]+)*[.][a-zA-Z]{2,})/.test(email))) {
      throw('Email validation error!');
    }

    Users.updateOne({ _id }, body).then(() => {
      Users.find().then(result => {
        res.send('Data changed successfully!');
      });
    });
  } catch (error) {
    res.status(422).send(error);
  }
};

module.exports.deleteUser = async (req, res) => {
  const { query } = req;
  const { _id } = query;

  try {
    const candidate = await Users.findOne({ _id });
    if (!candidate) throw('User is not found!');

    if (_id) {
      Users.deleteOne({ _id }).then(() => {
        Users.find().then(result => {
          res.send('User deleted successfully!');
        });
      });
    } else {
      throw('Invalid data entered!');
    }
  } catch (error) {
    res.status(422).send(error);
  }
};
