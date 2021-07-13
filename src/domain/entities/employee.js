const uuid = require('uuid').v4;

module.exports = class Employee {
  constructor(data) {
    this.id = data.id ?? uuid();
    this.age = data.age;
    this.name = data.name;
    this.office = data.office;
  }
};
