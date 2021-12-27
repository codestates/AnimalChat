const { user, animal } = require("../../models")
const { isAuthorized } = require("../tokenFunc")

module.exports = async (req, res) => {
    const accessTokenData = isAuthorized(req)
    if (!accessTokenData) {
        return res.json({
            data: null,
            message: "회원정보가 일치하지 않습니다.",
        })
    }

    const { id, user_id, nickname } = accessTokenData
    await user.destroy({
        where: {
            user_id: user_id,
            nickname: nickname,
        },
    })
    await animal.destroy({
        where: {
            userId: user_id,
        },
    })
    res.clearCookie("jwt").status(205).send("회원탈퇴가 되었습니다.")
}
