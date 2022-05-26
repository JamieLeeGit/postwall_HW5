const appError = require("../service/appError");
const handleErrorAsync = require("../service/handleErrorAsync");
const httpService = require('../service/http');
const User = require('../models/user');

const user = {
    /**
     * 讀取所有user資料
     * @param {resquest} req 連線請求
     * @param {respones} res 回應結果
     */
    async readUserAll(req, res, next){  
        handleErrorAsync(async (req, res, next) => { 
            console.log('readUserAll');

            const data = await User.find();
            httpService.successHandle(req, res, data);
        })(req, res, next);
    }
}

module.exports = user;