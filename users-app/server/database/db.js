import Sequelize from 'sequelize';
import Chance from 'chance';
import _ from 'lodash';

const chance = new Chance();

const connection = new Sequelize('db', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: './database/db.sqlite'
});

const User = connection.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

connection.sync({force: true}).then(() => {
  _.times(10, () => {
    return User.create({
      name: chance.name(),
      age: chance.age(),
      email: chance.email(),
      address: chance.address()
    });
  });
});

export default connection