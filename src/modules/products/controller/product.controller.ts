import { Request, Response } from "express";
import { resolve } from "path";
import { JwtPayload } from "jsonwebtoken";
import ProductModel from "../model/product.model";
import CategoryModel from "../../category/model/category.model";
import { ProductBody } from "../../types";
interface CustomRequest extends Request {
  token?: JwtPayload;
}

const getAllProducts = async (req: Request, res: Response) => {
  try {
    //  istalgan odam  ko'ra olishi mumkin
    const allProducs = await ProductModel.findAll({
      attributes: {
        exclude: ["CategoryModelId", "OrderModelId", "CartModelId"],
      },
    });
    return res.status(200).json({
      status: 200,
      data: allProducs,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const chackproduct = await ProductModel.findAll({
      where: { id }
    });
    if (chackproduct.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Product not found",
      });
    }
    await ProductModel.update(
      { show: chackproduct[0].dataValues.show + 1 },
      { where: { id } }
    );
    const product = await ProductModel.findAll({
      where: { id },
      attributes: {
        exclude: ["CategoryModelId", "OrderModelId", "CartModelId"],
      },
    });
    return res.status(200).json({
      status: 200,
      message: "success",
      data: product,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
const search = async (req: Request, res: Response) => {
  try {
    const Products = await ProductModel.findAll({ attributes: {
      exclude: ["CategoryModelId", "OrderModelId", "CartModelId"],
    }});

    if (req.params.name) {
      let name = (req.params.name as string).toLowerCase();
      const matched = Products.filter((product) =>
        product.productName.toLowerCase().includes(name)
      );
      return res.status(200).json({
        message: "success",
        data: matched,
      });
    }
    return res.status(200).json({
      message: "success",
      data: Products,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
const createProduct = async (req: CustomRequest, res: Response) => {
  try {
    const fileFront: any = req.files?.fileFront;
    const fileBack: any = req.files?.fileBack;
    const data: ProductBody = req.body;
    let { model } = data;

    if (!req.token?.isAdmin) {
      return res.status(404).json({
        status: 404,
        message: "Your not admin",
      });
    }

    model = model.toLocaleUpperCase();

    let category: any = await CategoryModel.findAll({
      where: { category_name: model },
    });
    if (category?.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Model not found, Please Create Model in Category panel",
      });
    }
    let categoryId = category[0].id;

    const extFile = fileFront.name.replace(".", "");
    const extPattern = /(jpg|jpeg|webp|png|gif|svg)/gi.test(extFile);
    if (!extPattern) throw new TypeError("Image format is not valid");

    const extFile2 = fileBack.name.replace(".", "");
    const extPattern2 = /(jpg|jpeg|webp|png|gif|svg)/gi.test(extFile2);
    if (!extPattern2) throw new TypeError("Image format is not valid");

    let file1 = Date.now() + "-" + fileFront.name.replace(/\s/g, "");
    let file2 = Date.now() + "-" + fileBack.name.replace(/\s/g, "");

    fileFront.mv(resolve("src", "uploads", file1));
    fileBack.mv(resolve("src", "uploads", file2));

    const newProduct = await ProductModel.create({
      ...data,
      MainImage: file1,
      BackImage: file2,
      categoryId: categoryId,
    });

    res.status(201).json({
      status: 201,
      message: "success",
      data: newProduct,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const updateProduct = async (req: CustomRequest, res: Response) => {
  try {
    const fileFront: any = req.files?.fileFront;
    const fileBack: any = req.files?.fileBack;
    const id = req.params.id;
    const data: ProductBody = req.body;
    let {
      productName,
      model,
      price,
      color,
      count,
      nfc,
      ekran_chastotasi,
      protsessor,
      old_kamera,
      orqa_kamera,
      sim_karta_formati,
      sim_kartalar_soni,
      operatsion_system_version,
      aloqa_standarti,
      bluetooth_standarti,
      vazn,
      batary_power,
      ekran_nisbati,
      ekran_texnologiyasi,
      ekran_size,
      doimiy_xotira,
      operativ_xotira,
      description,
    } = data;

    if (!req.token?.isAdmin) {
      return res.status(404).json({
        status: 404,
        message: "Your not admin",
      });
    }
    if (model) {
      model = model.toLocaleUpperCase();
      let category: any = await CategoryModel.findAll({
        where: { category_name: model },
      });
      if (category.length === 0) {
        return res.status(404).json({
          status: 404,
          message: "Model not found, Please Create Model in Category panel",
        });
      }
    }

    //@ts-ignore
    let file1, file2;
    if (fileFront) {
      const extFile = fileFront.name.replace(".", "");
      const extPattern = /(jpg|webp|jpeg|png|gif|svg)/gi.test(extFile);
      if (!extPattern) throw new TypeError("Image format is not valid");
      file1 = Date.now() + "-" + fileFront.name.replace(/\s/g, "");
      fileFront.mv(resolve("src", "uploads", file1));
    }
    if (fileBack) {
      const extFile = fileBack.name.replace(".", "");
      const extPattern = /(jpg|webp|jpeg|png|gif|svg)/gi.test(extFile);
      if (!extPattern) throw new TypeError("Image format is not valid");
      file1 = Date.now() + "-" + fileBack.name.replace(/\s/g, "");
      fileBack.mv(resolve("src", "uploads", file1));
    }
    const product: any = await ProductModel.findAll({ where: { id } });

    if (!product) {
      return res.status(404).json({
        status: 404,
        message: "Product not found",
      });
    }

    const updatedProduct = await CategoryModel.update(
      {
        productName: productName || product[0].dataValues.productName,
        model: model || product[0].dataValues.model,
        price: price || product[0].dataValues.price,
        color: color || product[0].dataValues.color,
        count: count || product[0].dataValues.count,
        nfc: nfc || product[0].dataValues.nfc,
        ekran_chastotasi:
          ekran_chastotasi || product[0].dataValues.ekran_chastotasi,
        protsessor: protsessor || product[0].dataValues.protsessor,
        old_kamera: old_kamera || product[0].dataValues.old_kamera,
        orqa_kamera: orqa_kamera || product[0].dataValues.orqa_kamera,
        sim_karta_formati:
          sim_karta_formati || product[0].dataValues.sim_karta_formati,
        sim_kartalar_soni:
          sim_kartalar_soni || product[0].dataValues.sim_kartalar_soni,
        operatsion_system_version:
          operatsion_system_version ||
          product[0].dataValues.operatsion_system_version,
        aloqa_standarti:
          aloqa_standarti || product[0].dataValues.aloqa_standarti,
        bluetooth_standarti:
          bluetooth_standarti || product[0].dataValues.bluetooth_standarti,
        vazn: vazn || product[0].dataValues.vazn,
        batary_power: batary_power || product[0].dataValues.batary_power,
        ekran_nisbati: ekran_nisbati || product[0].dataValues.ekran_nisbati,
        ekran_texnologiyasi:
          ekran_texnologiyasi || product[0].dataValues.ekran_texnologiyasi,
        ekran_size: ekran_size || product[0].dataValues.ekran_size,
        doimiy_xotira: doimiy_xotira || product[0].dataValues.doimiy_xotira,
        operativ_xotira:
          operativ_xotira || product[0].dataValues.operativ_xotira,
        description: description || product[0].dataValues.description,
        MainImage: file1 || product[0].dataValues.MainImage,
        BackImage: file2 || product[0].dataValues.BackImage,
      },
      { where: { id } }
    );

    return res.status(201).json({
      status: 201,
      message: "updated",
      data: updatedProduct,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const deleteProduct = async (req: CustomRequest, res: Response) => {
  try {
    const id = req.params.id;

    if (!req.token?.isAdmin) {
      return res.status(404).json({
        status: 404,
        message: "Your not admin",
      });
    }
    const deletedProduct = await ProductModel.destroy({ where: { id } });
    if (deletedProduct === 0) {
      return res.status(404).json({
        status: 404,
        message: "Product not found !!!",
      });
    }
    return res.status(201).json({
      status: 201,
      message: "deleted user",
      data: deletedProduct,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

export default {
  getAllProducts,
  getProductById,
  search,
  createProduct,
  updateProduct,
  deleteProduct,
};
