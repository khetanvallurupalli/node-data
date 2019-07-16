const {
    new_UUID
} = require('../utils/uniqueId');


module.exports = class Data {

    constructor(dataObj) {
        this.key = dataObj.key || {};
        this.keys = dataObj.keys || {};
        this.data = dataObj.data || {};
        this.arrayData = Object.assign(this.data, this.key);
    }



    getKey_dynamo() {
        return this.key;
    }

    getData_dynamo() {
        return this.data;
    }

    removeKeyFromData() {

        for (var ele_key in this.data) {
            if (this.key[ele_key]) {
                delete this.data[ele_key];
            }
        }

    }

    getKeyConditionExpression_querydynamo() {
        let keyConditionExpression = ""
        let count = 1
        for (let key in this.data) {
            keyConditionExpression += `#f${count} = :f${count} and`
            count++
        }
        keyConditionExpression = keyConditionExpression.slice(0, -3);
        return keyConditionExpression
    }

    getExpressionAttributeNames_querydynamo() {
        var count = 1;
        var expressionAttributeNames = {}
        for (let key in this.data) {
            expressionAttributeNames[`#f${count}`] = key
            count++;
        }
        return expressionAttributeNames;
    }

    getExpressionAttributeValues_querydynamo() {

        var count = 1;
        var expressionAttributeValues = {}
        for (let key in this.data) {
            expressionAttributeValues[`:f${count}`] = this.data[key]
            count++;
        }
        return expressionAttributeValues;

    }

    getUpdateExpression__dynamo() {

        this.removeKeyFromData()

        var count = 1;

        var updateExpression = `set `
        for (let key in this.data) {

            if (count == 1) {
                updateExpression += `${key} = :f${count} ,`
            } else {
                updateExpression += `${key} = :f${count} ,`
            }
            count++;
        }

        updateExpression = updateExpression.slice(0, -1);

        return updateExpression;

    }


    getExpressionAttributeValues_dynamo() {

        this.removeKeyFromData()

        var count = 1;

        var expressionAttributeValues = {}
        for (let key in this.data) {
            expressionAttributeValues[`:f${count}`] = this.data[key]
            count++;
        }


        return expressionAttributeValues;
    }



    getAll_mysql(databaseName, tableName) {
        let sql = `SELECT * FROM ${databaseName}.${tableName}`;

        return [
            sql,
            null
        ]
    }


    getDataByKey_mysql(databaseName, tableName) {
        let sql = `SELECT * FROM ${databaseName}.${tableName} `;

        for (let key in this.key) {
            sql += `WHERE ${key} = '${this.key[key]}' `;
        }

        return [
            sql,
            null
        ]
    }

    getUpdateQuery_mysql(databaseName, tableName) {

        let sql = `UPDATE ${databaseName}.${tableName} SET `;

        this.removeKeyFromData()

        for (let key in this.data) {
            sql += ` ${key} = '${this.data[key]}' ,`;
        }
        sql = sql.slice(0, -1);


        for (let key in this.key) {
            sql += ` WHERE ${key} = '${this.key[key]}' ,`;
        }
        sql = sql.slice(0, -1);

        return [
            sql,
            null
        ]


    }
    getInsertQuery_mysql(databaseName, tableName) {
        let sql = `INSERT INTO ${databaseName}.${tableName} SET ?`;
        let args = this.data;

        return [
            sql,
            args
        ]
    }

    removeByKey_mysql(databaseName, tableName) {
        let sql = `DELETE FROM ${databaseName}.${tableName} WHERE ?`;
        let args = this.key;

        return [
            sql,
            args
        ]
    }

    getByKeys_mysql(databaseName, tableName) {

        let sql = `SELECT * FROM ${databaseName}.${tableName} `;

        
        let keyName = "";
        for (let key in this.keys) {
            console.log("key value");
            keyName = key;
        }

        sql += `WHERE ${keyName} IN ( ? ) `;



        return [
            sql,
            this.keys[keyName]
        ]
    }

    getQuery_mysql(databaseName, tableName) {

        let sql = `SELECT * FROM ${databaseName}.${tableName} WHERE`;

        for (let key in this.data) {
            sql += ` ${key} = '${this.data[key]}' AND `;
        }


        sql = sql.slice(0, sql.lastIndexOf('AND'));

        return [
            sql,
            null
        ]

    }

   

    getAll_postgres(tableName) {
        let sql = `SELECT * FROM ${tableName}`;
        return [sql, null];
    }
    getInsertQuery_postgres(tableName) {
        let sql = `INSERT INTO ${tableName} (`;
        Object.keys(this.data).forEach(k => {
            sql += `${k},`;
        });
        sql = sql.slice(0, -1);
        sql += `)`;
        sql += ` VALUES`;
        sql += `(`;
        let paramcount = 1;
        Object.keys(this.data).forEach(k => {
            sql += `$${paramcount},`;
            paramcount++;
        });
        sql = sql.slice(0, -1);
        sql += `)`;
        let values = [];
        Object.keys(this.data).forEach(k => {
            values.push(this.data[k]);
        });
        return [sql, values];
    }
    getDataByKey_postgres(tableName) {
        let sql = `SELECT * FROM ${tableName} `;
        sql += `WHERE `;
        sql += `${Object.keys(this.key)[0]} `;
        sql += `=`;
        sql += ` $1`;
        let args = `${this.data[Object.keys(this.key)[0]]}`;
        return [sql, [args]];
    }

    getUpdateQuery_mysql(tableName) {
        this.removeKeyFromData();
        let paramcount = 1;
        let args = [];
        let sql = `UPDATE ${tableName} SET `;
        for (let key in this.data) {
            sql += ` ${key} = ($${paramcount}) ,`;
            paramcount++;
            args.push(this.data[key]);
        }
        sql = sql.slice(0, -1);
        sql += `WHERE `;
        for (let key in this.key) {
            sql += ` ${key} = ($${paramcount}) ,`;
            paramcount++;
            args.push(this.key[key]);
        }
        sql = sql.slice(0, -1);
        return [sql, args];
    }

    getQuery_postgres(tableName) {
        let sql = `SELECT * FROM ${tableName} `;
        sql += `WHERE `;
        for (let key in this.data) {
          sql += ` ${key} = '${this.data[key]}' AND `;
        }
        sql = sql.slice(0, sql.lastIndexOf('AND'));
        return [sql, null]
    }

    getByKeys_postgres(tableName) {
        let sql = `SELECT * FROM ${tableName} `;
        sql += `WHERE `;
        sql += `${Object.keys(this.keys)[0]} `;
        sql += `IN`;
        sql += ` (`;
        let valueCount = 1;
        const keyValues = this.keys[Object.keys(this.keys)[0]];
        for (let i = 0; i < keyValues.length; i++) {
            sql += `$${valueCount},`;
            valueCount++;
        }
        sql = sql.slice(0, -1);
        sql += `) `;
        return [sql, keyValues];
    }

    removeByKey_postgres(tableName) {
        let sql = `DELETE FROM ${tableName} `;
        sql += `WHERE `;
        sql += `${Object.keys(this.key)[0]} `;
        sql += `=`;
        sql += ` $1`;
        let args = `${this.data[Object.keys(this.key)[0]]}`;
        return [sql, [args]];
    }

}
