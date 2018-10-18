module.exports = {
    like: function (req, res) {
        if (req.current_user.id==req.params.id){
            let responseData = {
                message: "You cannot like yourself"
            }
            return res.status(400).json(responseData);
        }

        Like.findOne({ likedByUser: req.current_user.id, likedUser: req.params.id }).exec(function (err, like) {
            if (!like) {
                Like.create({ likedByUser: req.current_user.id, likedUser: req.params.id }).exec(function (err, newLike) {
                    let responseData = {
                        message: "User " + req.params.id + " is successfully liked"
                    }
                    return res.status(200).json(responseData);
                });
            }
            else {
                let responseData = {
                    message: "User " + req.params.id+ " is already liked"
                }
                return res.status(400).json(responseData);
            }
        });
    },

    unlike: function (req, res) {
        Like.findOne({ likedByUser: req.current_user.id, likedUser: req.params.id }).exec(function (err, like) {
            if (like) {
                Like.destroy({ userThatLiked: req.current_user.id, likedUser: req.params.id }).exec(function (err, user) {
                    let responseData = {
                        like: like,
                        message: "User " + req.params.id + " is successfully unliked"
                    }
                    return res.status(200).json(responseData);
                })
            }
            else {
                let responseData = {
                    message: "User " + req.params.id+ " is not already liked"
                }
                return res.status(400).json(responseData);
            }
        });
    }
}
