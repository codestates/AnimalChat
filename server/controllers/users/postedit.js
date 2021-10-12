const { post } = require("../../models")
const { isAuthorized } = require('../tokenFunc');

// ***** 해당 게시물의 아이디가 들어와야함
module.exports = async(req, res) => {
    //console.log('postedit: ', req.body) // 기존 제목, 내용이 보여짐
    const accessTokenData = isAuthorized(req);
    // console.log(accessTokenData)
    // {
    //   id: 1,
    //   post_title: '안녕하세요',
    //   post_content: '배고파요',
    //   updatedAt: '2021-10-12T16:40:19.358Z',
    //   createdAt: '2021-10-12T16:40:19.358Z',
    //   iat: 1634056819,
    //   exp: 1634143219
    // }
   
    if( !post_title || !post_content ){
      res.status(401).send('제목과 내용은 필수입니다.')
    }
    const { post_title, post_content } = accessTokenData // 수정된 제목,내용
    post.update({
      post_title: req.body.post_title,
      post_content: req.body.post_content
    },
    { where: {
      id: id
    }}
    )
};