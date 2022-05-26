const appError = require("../service/appError");
const handleErrorAsync = require("../service/handleErrorAsync");
const httpService = require('../service/http');
const Post = require('../models/post');
const User = require('../models/user');

const posts = {
    /**
     * 讀取所有貼文
     * @param {resquest} req 連線請求
     * @param {respones} res 回應結果
     */
    async readPost(req, res, next){   
        handleErrorAsync(async (req, res, next) => {
            console.log('readPosts');

            const data = req.body;
            const pageNumber = data.pageNumber ? parseInt(data.pageNumber) : 0;
            const limit = data.limit ? parseInt(data.limit) : 10;

            const result = await Post.find()
                                .sort({createAt: -1})
                                .skip(pageNumber * limit)
                                .limit(limit)
                                .populate('userId');
            httpService.successHandle(req, res, result);
        })(req, res, next);
    },
    /**
     * 新增單筆貼文
     * @param {*} param0 
     */
    async createPostsOne(req, res, next){
        handleErrorAsync(async (req, res, next) => {
            console.log('createPostsOne');

            const data = req.body;
                data.userId = '628e3ef68d7eaf93b690e59f';
                
                // 檢查所有必填欄位
                if(data.userId && data.content){
                    // 取得userId    
                    const userProfile = await User.findOne({ _id: data.userId});

                    if(userProfile){
                        const newPost = await Post.create
                        (
                            {
                                userId: userProfile._id,
                                content: data.content,
                                image: data.image
                            }
                        );
        
                        if(newPost){
                            httpService.successHandle(req, res, newPost);
                        }else{
                            return next(appError(400,"新增資料失敗",next));
                        }
                    }else{
                        return next(appError(404,"找不到 user 資料",next));
                    }         
                }else{                
                    return next(appError(400,"未填寫 userId 或 content",next));
                } 
        })(req, res, next);
    }
}

module.exports = posts;