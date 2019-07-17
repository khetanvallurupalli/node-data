const http = require('http');
const { Client } = require('pg');
const PORT = process.env.PORT || 5000;
const connectionString = process.env.DATABASE_URL
console.log(process.env.DATABASE_URL)
const client = new Client({
  connectionString: "postgres://izntceifgxqptv:a36f5bbcbb3ba18be3473cf4a59bcc4e2ff0ea749d119896736b1a93e583a9ef@ec2-107-20-168-237.compute-1.amazonaws.com:5432/d1uu99bfh2ctd9",
});
console.log(process.env.DATABASE_URL)
client.connect();

function query(q) {}

async function ReadAll(dbmParam, dbObj) {
  let querydata = dbObj.getAll_postgres(dbmParam.tableName);
  let q = querydata[0];
  return new Promise((resolve, reject) => {
    client.query(q, (err, res) => {
      if (err) {
        return reject(err);
      }
      return resolve(res.rows);
    });
  });
}
async function Insert(dbmParam, dbObj) {
  let querydata = dbObj.getInsertQuery_postgres(dbmParam.tableName);
  let q = querydata[0];
  let args = querydata[1];
  return new Promise((resolve, reject) => {
    client.query(q, args, (err, res) => {
      if (err) {
        return reject(err);
      }
      return resolve(res.rows);
    });
  });
}
async function ReadByKey(dbmParam, dbObj) {
  let querydata = dbObj.getDataByKey_postgres(dbmParam.tableName);
  let q = querydata[0];
  let args = querydata[1];
  return new Promise((resolve, reject) => {
    client.query(q, args, (err, res) => {
      if (err) {
        return reject(err);
      }
      return resolve(res.rows);
    });
  });
}

async function Querydata(dbmParam, dbObj) {
    let querydata = dbObj.getQuery_postgres(dbmParam.tableName);
    let q = querydata[0];
    let args = querydata[1];
    return new Promise((resolve, reject) => {
      client.query(q, args, (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res.rows);
      });
    });
  }

  async function ReadByKeys(dbmParam, dbObj) {
    let querydata = dbObj.getByKeys_postgres(dbmParam.tableName);
    let q = querydata[0];
    let args = querydata[1];
    return new Promise((resolve, reject) => {
      client.query(q, args, (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res.rows);
      });
    });
  }

  async function RemoveByKey(dbmParam, dbObj) {
    let querydata = dbObj.removeByKey_postgres(dbmParam.tableName);
    let q = querydata[0];
    let args = querydata[1];
    return new Promise((resolve, reject) => {
      client.query(q, args, (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res.rows);
      });
    });
  }

async function Updatewithkey(dbmParam, dbObj) {
  let queryData = dbObj.getUpdateQuery_mysql(dbmParam.tableName);
  let q = queryData[0];
  let args = queryData[1];
  console.log(q);
  console.log(args);
  return new Promise((resolve, reject) => {
    client.query(q, args, (err, res) => {
      if (err) {
        return reject(err);
      }
      return resolve(res.rows);
    });
  });
}
 
async function Query() {
  console.log(...arguments);
}

module.exports = {
  ReadAll,
  Insert,
  Updatewithkey,
  ReadByKey,
  Query,
  RemoveByKey,
  ReadByKeys,
  Querydata
};
