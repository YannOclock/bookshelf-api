const client = require('../client');

class CoreModel {

    static tableName = null;

    constructor(data){
        for (const field of this.constructor.fields){
            this[field] = data[field];
        }
    }

    static async find(){

        const result = await client.query(`SELECT * FROM ${this.tableName}`);

        const instanceList = [];

        for(const row of result.rows){
            instanceList.push(new this(row));
        }

        return instanceList;

    }

}

module.exports = CoreModel;