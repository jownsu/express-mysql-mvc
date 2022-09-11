const Model = require('./Model');
const Validate = require('../system/Validate');
const bcrypt = require('bcryptjs');

class Student extends Model{

    constructor(){
        super();
        this.table = 'users';
    } 

    async get_by_email(email){
        let query = "SELECT * FROM " + this.table + " WHERE email = ? LIMIT 1";
        const res = await this.raw_query(query, [email]);
        return res.data
    }

    async login(input){
        let query = "SELECT * FROM " + this.table + " WHERE email = ? LIMIT 1";
        const res = await this.raw_query(query, [input.email]);

        if(res.data.length != 0 && bcrypt.compareSync(input.password, res.data[0].password)){
            return res;
        }else{
            return false;
        }
    }

    async create(input){
        let hashedPassword = bcrypt.hashSync(input.r_password, 10);
        let query = "INSERT INTO " + this.table + " (first_name, last_name, email, password, created_at, updated_at) VALUES(?, ?, ?, ?, NOW(), NOW())";
        const res = await this.raw_query(query, [input.first_name, input.last_name, input.r_email, hashedPassword]);
        return res.data;
    }

    validate_login(input){
        let validate = new Validate(input);
        validate.set_rules('email', 'Email', ['required', 'email']);
        validate.set_rules('password', 'Password', ['required']);
        
        return validate.run();
    }

    validate_register(input){
        let validate = new Validate(input);
        validate.set_rules('first_name', 'First name', ['required']);
        validate.set_rules('last_name', 'Last name', ['required']);
        validate.set_rules('r_email', 'Email', ['required']);
        validate.set_rules('r_password', 'Password', ['required']);
        validate.set_rules('confirm_password', 'Password', ['confirm'], 'r_password');

        return validate.run();
    }
}

module.exports = new Student();
