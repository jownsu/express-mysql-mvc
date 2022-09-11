const config = require('../config/config');

class View {

    constructor(){
        this.partial_path = "partials/"
    }

    /*
        DOCU: This function is the alternate of res.redirect. If
              profiler is enabled in config it will include the query in the
              profiler
        OWNER: Jhones
    */
    redirect(res, path, req, response){
        if(config.profilerEnabled){
            if(req != null){
                req.session.query = response.query;
            }
            res.redirect('/students/profile');
        }
        else{
            res.redirect(path);
        }
    }

    /*
        DOCU: This function is the alternate of res.render. If
              profiler is enabled in config it will append the profiler in
              the html output.
        OWNER: Jhones
    */
    render(res, path, val = {}, req, response){
        if(config.profilerEnabled){
            if(req != null){
                req.session.query = response.query;
            }
            let profilerHTML = this.setProfiler(res.locals.profiler);
            res.render(path, val, function(err, html){
                res.send(html + profilerHTML);
            });
        }
        else{
            res.render(path, val);
        }
    }

    /*
        DOCU: This function is the alternate of res.render. If
              profiler is enabled in it will include the query in 
              the profiler
        OWNER: Jhones
    */
    renderPartial(res, path, val = {}, req, response){
        if(config.profilerEnabled){
            if(req != null){
                req.session.query = response.query;
            }
            res.render(this.partial_path + path, val);
        }
        else{
            res.render(this.partial_path + path, val);
        }
    }

    /*
        DOCU: This function will setup the profiler elements expecting an
              res.locals.profiler in middleware.
        OWNER: Jhones
    */
    setProfiler(data){
        let html = "";
        html += "<div style='font-family: sans-serif;'>";
        html += this.setKeyValueData('URL', data.url);
        html += this.setKeyValueData('HTTP HEADERS', data.httpHeader);
        html += this.setData('DATABASE QUERY', data.query);
        html += this.setKeyValueData('SESSION DATA', data.session);
        html += this.setKeyValueData('GET QUERY', data.get);
        html += this.setKeyValueData('POST DATA', data.post);
        html += this.setData('MEMORY USAGE', data.memoryUsage);
        html += "</div>";
        return html;
    }

    /*
        DOCU: This function will render card in profiler. it expects the title
              of the card and data that will itterated the key value pair.
        OWNER: Jhones
    */
    setKeyValueData(title="DATA", data){
        let html = "";
        html += "  <div style='border: 3px solid tomato;border-radius: 7px;margin: 10px 50px;padding: 20px;background: wheat;'>";
        html += "      <p class='title'>" + title + "</p>";
        if(Object.keys(data).length != 0){
            html += "<pre>" + JSON.stringify(data, null, 2) + "</pre>"
        }
        else{
            html += " <p>NULL</p>";
        }

        html += "  </div>";
        return html;
    }

    /*
        DOCU: This function will render card in profiler. it expects the title
              of the card data that wil dispaly on that card.
        OWNER: Jhones
    */
    setData(title="DATA", data){
        let html = "";
        html += "  <div style='border: 3px solid tomato;border-radius: 7px;margin: 10px 50px;padding: 20px;background: wheat;'>";
        html += "      <p class='title'>" + title + "</p>";
        if(data != null){
            html += "      <p>" + data +"</p>";
        }else{
            html += "      <p>NULL</p>";
        }
        html += "  </div>";
        return html;
    }
}

module.exports = new View();