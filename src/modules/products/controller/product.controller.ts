import { Request, Response } from "express";
import { resolve } from "path";
import jwt from "../../../utils/jwt";
import ProductModel from "../model/product.model";
import CategoryModel from "../../category/model/category.model";
import { ProductBody } from "../../types";

const getAllProducts = async (req: Request, res: Response) => {
  try {
    //  istalgan odam  ko'ra olishi mumkin
    const allProducs = await ProductModel.findAll();
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

    const product = await ProductModel.findAll({
      where: { id },
    });

    if (product.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Product not found",
      });
    }
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
const search =async (req:Request, res: Response) => {  
   
  const Products = await ProductModel.findAll()
    if (req.query.name) {
     let name = (req.query.name as string).toLowerCase()
        const matched = Products.filter(product => product.productName.toLowerCase().includes(name));
       return res.status(200).json({
          message: 'success',
          data: matched
        })
    } 
    return res.status(200).json({
      message: 'success',
      data: Products
    })
 
}

const createProduct = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers["authorization"];
    const access_token = authHeader && authHeader.split(" ")[1];

    const files: any = req.files?.files;

    const data: ProductBody = req.body;
    let { model } = data;

    const chekToken: any = jwt.verify(access_token);
    if (!chekToken?.isAdmin) {
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

    for (let i = 0; i < files?.length; i++) {
      var { name } = files[i];
    }

    const extFile = name.replace(".", "");
    const extPattern = /(jpg|jpeg|webp|png|gif|svg)/gi.test(extFile);
    if (!extPattern) throw new TypeError("Image format is not valid");

    let file1 = Date.now() + "-1-" + files[0].name.replace(/\s/g, "");
    let file2 = Date.now() + "-2-" + files[1].name.replace(/\s/g, "");

    files[0].mv(resolve("src", "uploads", file1));
    files[1].mv(resolve("src", "uploads", file2));

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

const updateProduct = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers["authorization"];
    const access_token = authHeader && authHeader.split(" ")[1];

    const files: any = req.files?.files;
    // const file: any = req.files?.file;
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

    const chekToken: any = jwt.verify(access_token);
    if (!chekToken?.isAdmin) {
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
    if (files) {
      for (var i = 0; i < files.length; i++) {
        var { mv, name } = files[i];
      }
      let filename1 = await files[0];
      let filename2 = await files[1];

      const extFile = name.replace(".", "");
      const extPattern = /(jpg|webp|jpeg|png|gif|svg)/gi.test(extFile);
      if (!extPattern) throw new TypeError("Image format is not valid");

      file1 = Date.now() + "-2-" + filename1.name.replace(/\s/g, "");
      file2 = Date.now() + "-3-" + filename2.name.replace(/\s/g, "");

      mv(resolve("src", "uploads", file1));
      mv(resolve("src", "uploads", file2));
    }
    //////////////////////////////////////////
    const product: any = await ProductModel.findAll({ where: { id } });
    console.log(product);

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

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers["authorization"];
    const access_token = authHeader && authHeader.split(" ")[1];
    const id = req.params.id;

    const chekToken: any = jwt.verify(access_token);
    if (!chekToken?.isAdmin) {
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
