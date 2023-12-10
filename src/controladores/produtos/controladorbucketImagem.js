const aws = require("aws-sdk");
const s3 = require("../../configs/bucket");
require("dotenv").config();

const bucketImagem = {
  async enviar(req, res) {
    const { file } = req;
    const imagem = await s3
      .upload({
        Bucket: process.env.BLAZE_NAME,
        Key: `imagens/${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
      .promise();
    return {
      url: imagem.Location,
      path: imagem.Key,
    };
  },
  async excluir(path) {
    await s3
      .deleteObject({
        Bucket: process.env.BLAZE_NAME,
        Key: path,
      })
      .promise();
  },
};
module.exports = bucketImagem;
