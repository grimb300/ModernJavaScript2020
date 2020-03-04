const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const Repository = require('./repository');

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
  async create (attrs) {
    attrs.id = this.randomId();

    const salt = crypto.randomBytes(8).toString('hex');
    const buf = await scrypt(attrs.password, salt, 64);

    const records = await this.getAll();
    const record = {
      ...attrs,
      password: `${buf.toString('hex')}.${salt}`
    };
    records.push(record);

    await this.writeAll(records);

    return record;
  }

  async comparePasswords (saved, supplied) {
    const [ hashed, salt ] = saved.split('.');

    // If the database is corrupt, there may not be a salt provided
    if (!salt) {
      return false;
    }

    // Hash the supplied password
    const suppliedBuf = await scrypt(supplied, salt, 64);

    return hashed === suppliedBuf.toString('hex');
  }
}

// Export an instance of the class so that the file that requires
//  it doesn't need to create an instance on its own
module.exports = new UsersRepository('users.json');
