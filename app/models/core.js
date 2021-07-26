

const client = require('../client');

class CoreModel {

    static tableName = null;

    constructor(data) {
        this.id = data.id;
        this.setData(data);
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }

    setData(data) {
        for (const field of this.constructor.fields) {
            // Afin de pouvoir faire un patch et de ne pas écrasé les valeurs de propriété avec des valeurs non-existante provenant du controller (par extension du client) on conditionne l'écrasement de la valeur de la propriété
            if (data[field]) {
                this[field] = data[field];
            }
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

        if (!result.rows[0]) {
            return null;
        }

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
     */
    async delete() {
        const preparedQuery = {
            text: `SELECT delete_${this.constructor.tableName}($1)`,
            values: [this.id]
        }

        await client.query(preparedQuery);
    }

}

module.exports = CoreModel;