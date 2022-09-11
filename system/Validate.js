
class Validate {

    constructor(input){
        this.input = input;
        this.errors = {};
        this.rules = ['required', 'email', 'confirm'];
        this.window;
    }

    set_rules(field, label, rules, optional = ''){
        for(let i = rules.length - 1; i >= 0; i--){
            this.validate(rules[i], field, label, optional);
        }
    }

    required(field, label){
        if(this.input[field] == null || this.input[field] == ''){
            this.errors[field] = label + ' is required.'
        }
    }

    email(field, label){
        if(this.input[field].split('@')[1] == null){
            this.errors[field] = label + ' is invalid';
        }
        else if(this.input[field].split('@')[1].split('.')[1] == null){
            this.errors[field] = label + ' is invalid';
        }
    }

    confirm(field, label, val){
        if(this.input[field] != this.input[val]){
             this.errors[field] = label + ' must match';
        }
    }

    validate(name, field, label, optional){
        if((!this.rules.includes(name)) || (typeof this[name] !== 'function')){
            return;
        }
        this[name](field, label, optional);
    }

    run(){
        if(Object.keys(this.errors).length > 0){
            return this.errors;
        }
        else{
            return true;
        }
    }
}

module.exports = Validate;