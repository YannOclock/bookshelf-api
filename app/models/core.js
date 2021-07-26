

const client = require('../client');

class CoreModel {

    static tableName = null;

    constructor(data) {
        this.id = data.id;
        this.setData(data);
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }

    setData(data){
        for (const field of this.constructor.fields) {
            this[field] = data[field];
        }
    }

    /**
     * Get all record from table
     * @returns {object[]}
     */
    static async find() {

        const result = await client.query(`SELECT * FROM ${this.tableName}`);

        const instanceList = [];

        for (const row of result.rows) {
            instanceList.push(new this(row));
        }

        return instanceList;

    }

    /**
     * Get one record from table
     * @param {number} id 
     * @returns {object}
     */
    static async findOne(id) {

        const result = await client.query(`SELECT * FROM ${this.tableName} WHERE id = $1`, [id]);

        return new this(result.rows[0]);

    }

    /**
     * Insert or update instance in database
     * @returns {object}
     */
    async save() {

        let action;

        if (this.id) {
            action = 'update';
        } else {
            action = 'insert';
        }

        const preparedQuery = {
            text: `SELECT * FROM ${action}_${this.constructor.tableName}($1::json)`,
            values: [this]
        }

        const result = await client.query(preparedQuery);

        this.setData(result.rows[0]);

        return this;

    }

    /**
     * Delete from database
     * @param {number} id 
     */
    async delete(id) {
        const preparedQuery = {
            text: `SELECT delete_${this.constructor.tableName}($1)`,
            values: [id]
        }

        await client.query(preparedQuery);
    }

}

module.exports = CoreModel;