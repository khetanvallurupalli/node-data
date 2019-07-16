module.exports = class DbmParam {

    constructor(dbmObj) {
        this.databaseType = dbmObj.databaseType;
        this.databaseName = dbmObj.databaseName;
        this.tableName = dbmObj.tableName;
    }

}
