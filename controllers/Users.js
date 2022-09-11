const Student = require('../models/Student');
const View = require('../system/View');

class Users{

    view_login(req, res){
        if(req.session.user != null){
            res.redirect('/students/profile');
            return;
        }
        let error = req.session.error || {};
        req.session.error = {};
        View.render(res, 'login', {error});
    }
    
    async login(req, res){
        let result = Student.validate_login(req.body);
        
        if(result !== true){
            req.session.error = result;
            res.redirect('/');
            return;
        }

        const response = await Student.login(req.body);

        if(response === false){
            req.session.error = {invalid: 'Invalid credentials'};
            View.redirect(res, '/', req, response);
            res.redirect('/');
        }
        else{
            req.session.query = response.query;
            req.session.user = { id: response.data[0].id };
            View.redirect(res, '/', req, response);
        }
        
    }
    
    async register(req, res){
        let result = Student.validate_register(req.body);
    
        if(result !== true){
            req.session.error = result;
            res.redirect('/');
            return;
        }
    
        const user = await Student.get_by_email(req.body.r_email);

        if(user.length >= 1){
            req.session.error = {taken: 'Email is already taken'};
            res.redirect('/');
        }
        else{
            const data = await Student.create(req.body)
            req.session.user = { id: data['insertId'] };
            res.redirect('/students/profile');
        }

    }
    
    logout(req, res){
        req.session.user = null;
        res.redirect('/');
    }
}


module.exports = Users;
