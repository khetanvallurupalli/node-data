const { dataModel, dbmParamModel } = require('../models');
const dbm = require('../db/index');

async function insert(reqBody) {

    try {
    

        let dbmCtrl = new dbmParamModel(reqBody);
        let reqDataModel = new dataModel(reqBody);

        let data = await dbm[dbmCtrl.databaseType].Insert(dbmCtrl, reqDataModel);

        return {
            code: 200,
            success: true,
            message: `Record created`,
            data: data,
            err: null
        }

    } catch (err) {
        console.log(err)
        return {
            code: 200,
            success: false,
            message: `record creation failed`,
            data: null,
            err: err.message
        }

    }

}

async function readAll(reqBody) {

    try {

        let dbmCtrl = new dbmParamModel(reqBody);
        let reqDataModel = new dataModel(reqBody);
        let dataList = await dbm[dbmCtrl.databaseType].ReadAll(dbmCtrl, reqDataModel);

        return {
            code: 200,
            message: `All data`,
            success: true,
            data: dataList,
            err: null
        }

    } catch (err) {
        console.log(err)
        return {
            code: 200,
            success: false,
            message: `data fetch failed`,
            data: null,
            err: err.message
        }

    }


}

module.exports = {
    readAll: readAll,
    insert: insert
}
