const Product = require("../mongoose/model/Product");

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
  } catch (error) {
    res.status(400).send(error);
  }
};
