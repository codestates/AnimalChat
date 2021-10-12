const { post } = require("../../models")
const { generateAccessToken, generateRefreshToken } = require("../tokenFunc")

module.exports = async (req, res) => {
  console.log(req.body)

  console.log(req.file)
  //   console.log(req)
  const { post_title, post_content } = req.body

  // post_users의 id, post_id, userid, createdAt, updatedAt 가져와야함
  if (req.file) {
    res.send({
      fileName: req.file.filename,
    })
  } else if (!post_title || !post_content) {
    res.status(401).send("제목과 내용 사진은 필수입니다.")
  } else {
    // 제목과 내용을 사진을 모두 작성한 경우
    await post.create({
      user_id: req.body.user_id,
      post_title: req.body.post_title,
      post_content: req.body.post_content,
      post_img: req.body.post_img,
      animalcategory: req.body.animalcategory,
    })
    res.status(200).send({ message: "ok" })
  }
  //////////////////여기서 부터 사진 업로드 구현/////////////////

}
