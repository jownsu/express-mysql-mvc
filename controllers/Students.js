const Student = require('../models/Student');
const View = require('../system/View');

class Students {
    
    async view_profile(req, res){
        if(req.session.user == null){
            res.redirect('/');
            return;
        }
    
        const response = await Student.get_by_id(req.session.user.id, 'id, first_name, last_name, email')
        View.render(res, 'profile', { user: response.data[0] }, req, response);
    }

}


module.exports = new Students();

