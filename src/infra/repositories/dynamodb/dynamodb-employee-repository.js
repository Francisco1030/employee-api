const AWS = require('aws-sdk');
const Employee = require('../../../domain/entities/employee');
const EmployeeRepository = require('../../../domain/repositories/employee-repository');
const { NotFoundError } = require('../../../shared/utils/errors');

module.exports = class DynamoDbEmployeeRepository extends EmployeeRepository {
  constructor() {
    super();
    this.table = 'employees';
    this.conn = new AWS.DynamoDB.DocumentClient();
    this.entity = Employee;
  }

  #parse(data) {
    return {
      TableName: this.table,
      ...data
    };
  }

  async create(data) {
    const entity = new this.entity(data);

    const params = this.#parse({
      Item: {
        "id": entity.id,
        "age": entity.age,
        "name": entity.name,
        "office": entity.office,
      }
    });

    await this.conn.put(params).promise();

    return entity;
  }

  async fetchOne(where) {
    const params = this.#parse({
      KeyConditionExpression: "id = :i",
      ExpressionAttributeValues: {
        ":i": where
      }
    });

    const { Items: [record], Count: total } = await this.conn.query(params).promise();

    if (!total) throw new NotFoundError(`${this.entity.name} not found!`);
    const entity = new this.entity(record);

    return entity;
  }

  async fetchAll() {
    const params = this.#parse();
    const { Items: records } = await this.conn.scan(params).promise();
    const entities = records.map((record) => new this.entity(record));

    return entities;
  }

  async update(data) {
    const entity = new this.entity(data);

    const params = this.#parse({
      Key: {
        "id": entity.id,
      },
      UpdateExpression: "set #ag = :a, #nm = :n, #ofc = :o",
      ExpressionAttributeValues: {
        ":a": entity.age,
        ":n": entity.name,
        ":o": entity.office,
      },
      ExpressionAttributeNames: {
        "#ag": "age",
        "#nm": "name",
        "#ofc": "office"
      }
    });

    await this.conn.update(params).promise();

    return entity;
  }

  async destroy(data) {
    return await this.update({ ...data, deletedAt: new Date() });
  }

  async delete(id) {
    const params = this.#parse({
      Key: {
        "id": id,
      }
    });

    await this.conn.delete(params).promise();
  }
};
