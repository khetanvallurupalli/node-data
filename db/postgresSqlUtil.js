const { Pool, Client } = require("pg");
//const connectionString =
//process.env.DATABASE_URL

//console.log(process.env.DATABASE_URL)
const client = new Client({
  connectionString: "postgres://gsdytjzytexzwl:c143032ad30adf81c6281fdf4a85377a8eb24094a06593701aa8efddf43263bf@ec2-23-21-177-102.compute-1.amazonaws.com:5432/dfd5k5g7oh1co0",
  ssl: true
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
