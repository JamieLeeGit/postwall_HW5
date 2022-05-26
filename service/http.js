const http = {
    successHandle(req, res, data){
        console.log(data);
        res.send(data);
        res.end();
    }
}

module.exports = http;