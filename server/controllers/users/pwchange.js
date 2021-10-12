const { user } = require('../../models')
const { isAuthorized } = require('../tokenFunc');

module.exports = async(req, res) => {
    //비밀번호 변경 
    //기존에 있는 정보인지 확인하고 (토큰에 있는 정보인지 확인하고)
    //update로 데이터베이스 수정 
    const accessTokenData = isAuthorized(req);
    //console.log(accessTokenData)
    if (!accessTokenData) {
        return res.json({ data: null, message: 'not authorized' });
      }

    const { user_id, password } = accessTokenData
    //user_id와 password가 토큰발급한 정보와 같으면 비밀번호를 업데이트해라  
    user.update({
        password: req.body.password
    }, 
    { where: { 
        user_id: user_id,
        password: password
     }
    })
    res.status(201).send()
};