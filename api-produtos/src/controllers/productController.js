const Product = require("../mongoose/model/Product");
const { default: axios } = require("axios");

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.get = async (req, res) => {
  try {
    const products = await Product.find({}).exec();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).send(error);
  }
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
exports.post = async (req, res) => {
  try {
    req.body.sku = Math.round(Math.random() * 8999 + 1000);
    console.log(req.body);
    const product = await Product.create(req.body);
    res.status(200).json(product);

    const mailBody = {
      emailFrom: "vitormiriani01@gmail.com",
      emailTo: "rm86070@fiap.com.br",
      subject: `${req.body.name} inserido com sucesso!`,
      text:
        "Produto inserido na base de dados:\n" +
        "Nome: ${req.body.name}\n" +
        "Preço: R$ ${req.body.price}\n" +
        "Quantidade: ${req.body.quantity}",
    };
    await axios({
      url: "http://localhost:8080/send-email",
      method: "post",
      data: mailBody,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
