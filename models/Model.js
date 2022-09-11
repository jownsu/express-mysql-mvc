
const mysql = require('mysql2/promise');
const config = require('../config/database');

class Model {
    constructor(){
        this._select = "";
        this._where = "";
        this._order_by = "";
        this._limit = "";
        this._values = [];
        this.table = "";
        this.con = mysql.createPool(config);
    }
    /*
        DOCU: This function will run raw query and return the result.
        OWNER: Jhones
    */
    async raw_query(query, values = []){
        const [result] = await this.con.query(query, values);
        return {data: result, query: query};
    }

    /*
        DOCU: This function will return all the values on specified table.
        OWNER: Jhones
    */
    async get_all(){
        let query = "SELECT * FROM " + this.table;
        const [rows] = await this.con.query(query)
        return {data: rows, query: query};
    }

    /*
        DOCU: This function will return the value based on given ID .
        OWNER: Jhones
    */
    async get_by_id(id, select = '*'){
        let query = "SELECT " + select + " FROM " + this.table + " WHERE id = ? LIMIT 1";
        const [rows] = await this.con.query(query, [id]);
        return {data: rows, query: query};
    }
    
    /*
        DOCU: This function will return the value based on the compilation
                of query. This function must be called last after all the query
                functions.
        OWNER: Jhones
    */
    async fetch(){
        const [rows] = await this.con.query(this._select + this._where + this._order_by, this._values);
        this.clear_queries();
        return {data: rows, query: this._select + this._where + this._order_by};
    }

    /*******************************/
    /*   QUERY BUILDER FUNCTIONS   */
    /*******************************/

    /*
        DOCU: This function will setup the query builder. It is the
                starting point of the query.
        OWNER: Jhones
    */
    select(query = '*'){
        this._select = "SELECT " + query + " FROM " + this.table + " ";
    }

    inner_join(table, fk, join_fk = 'id'){
        this._select += "INNER JOIN " + table + " ON " + this.table + "." + fk + " = " + table + "." + join_fk + " ";
    }

    left_join(table, fk, join_fk = 'id'){
        this._select += "LEFT JOIN " + table + " ON " + this.table + "." + fk + " = " + table + "." + join_fk + " ";
    }

    where(field, operation, value){
        if(value == null){
            value = operation
            operation = ' = ';
        }
        this._where = "WHERE " + field + " " + operation + " ? ";
        this._values.push(value);
    }

    and_where(field, operation, value){
        if(value == null){
            value = operation
            operation = ' = ';
        }
        this._where += 'AND ' + field + " " + operation + " ? ";
        this._values.push(value);
    }

    or_where(field, operation, value){
        if(value == null){
            value = operation
            operation = ' = ';
        }
        this._where += 'OR ' + field + " " + operation + " ? ";
        this._values.push(value);
    }

    and_where_in(field, values){
        this._where += 'AND ' + field + " IN (";
        this._where += "?,".repeat(values.length).slice(0, -1);
        this._where += ") ";

        for (let val of values){
            this._values.push(val);
        }
    }

    or_where_in(field, values){
        this._where += 'OR ' + field + " IN (";
        this._where += "?,".repeat(values.length).slice(0, -1);
        this._where += ") ";

        for (let val of values){
            this._values.push(val);
        }
    }

    order_by(field, value = "ASC"){
        this._order_by = "ORDER BY " + field + " " + value + " ";
    }

    /*
        DOCU: This query builder function will reset all the current queries.
        OWNER: Jhones
    */
    clear_queries(){
        this._select = "";
        this._where = "";
        this._order_by = "";
        this._limit = "";
        this._values = [];
    }
}

module.exports = Model;
