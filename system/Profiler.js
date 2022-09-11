profiler = (req, res, next) => {
    const used = process.memoryUsage().rss / 1024 / 1024;
    const mbUsed = Math.round(used * 100) / 100;
    res.locals.profiler = {
        memoryUsage  : mbUsed + "kb",
        get          : req.query,
        post         : req.body,
        session      : req.session,
        httpHeader   : req.headers,
        url          : req.headers.host + req.url,
        query        : req.session.query
    };

    req.session.query = null;
    next();
}

module.exports = profiler;