import { Request, Response } from "express";
import { resolve } from "path";  
import { JwtPayload } from "jsonwebtoken";
import CategoryModel from "../model/category.model"; 
interface CustomRequest extends Request {
  token?: JwtPayload; 
}

const createCategory = async (req: CustomRequest, res: Response) => {
  try { 
    const file: any = req.files?.file;
    let { category_name }: { category_name: string } = req.body;
     
    if (!req.token?.isAdmin) {
      return res.status(404).json({
        status: 404,
        message: "Your Not is Admin",
      });
    }
    category_name = category_name.toLocaleUpperCase();
    const checkCategory = await CategoryModel.findAll({
      where: { category_name },
    });
    if (checkCategory.length !== 0) {
      return res.status(404).json({
        status: 404,
        message: "This is category already exists",
      });
    }
    if (!file) {
      return res.status(404).json({
        status: 404,
        message: "Image must be uploaded !!!",
      });
    }

    let { name, mv } = await file;
    const extFile = name.replace(".", "");
    const extPattern = /(jpg|jpeg|webp|png|gif|svg)/gi.test(extFile);
    if (!extPattern) throw new TypeError("Image format is not valid");
    name = Date.now() + "-" + name.replace(/\s/g, "");
    mv(resolve("src", "uploads", name));

    const newCategory = await CategoryModel.create({
      category_name,
      category_image: name,
    });
    return res.status(201).json({
      status: 201,
      message: "success",
      data: newCategory,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const getAllCategory = async (req: Request, res: Response) => {
  try {
    //  istalgan odam  ko'ra olishi mumkin
    const allCategory = await CategoryModel.findAll({
      attributes: ["id", "category_name", "category_image"],
      include: [{ all: true }],
    });
    return res.status(200).json({
      status: 200,
      data: allCategory,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const getCategoryById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const category = await CategoryModel.findOne({
      where: { id },
      include: [{ all: true }],
    });

    if (!category) {
      return res.status(404).json({
        status: 404,
        message: "Category not found",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "success",
      data: category,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
const getCategoryByName = async (req: Request, res: Response) => {
  try {
    let name = req.params.name; 
    
    const category = await CategoryModel.findAll({
      where: { category_name: name.toLocaleUpperCase() },
      include: [{ all: true }],
    });   

    if (category.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Category not found",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "success",
      data: category,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const updateCategory = async (req: CustomRequest, res: Response) => {
  try { 
    const file: any = req.files?.file;
    let { category_name }: { category_name: string } = req.body;
    let id = req.params.id;

  
    if (!req.token?.isAdmin) {
      return res.status(404).json({
        status: 404,
        message: "Your Not is Admin",
      });
    }
    category_name = category_name.toLocaleUpperCase();
    const checkCategory: any = await CategoryModel.findAll({
      where: { category_name },
    });
    if (checkCategory.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Category not found",
      });
    }
    if (file) {
      var { name, mv } = await file;
      const extFile = name.replace(".", "");
      const extPattern = /(jpg|jpeg|webp|png|gif|svg)/gi.test(extFile);
      if (!extPattern) throw new TypeError("Image format is not valid");
      name = Date.now() + "-" + name.replace(/\s/g, "");
      mv(resolve("src", "uploads", name));
    }
    const updatedCategory = await CategoryModel.update(
      {
        category_name,
        category_image: name || checkCategory[0].category_image,
      },
      { where: { id } }
    );
    return res.status(201).json({
      status: 201,
      message: "success",
      data: updatedCategory,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const deleteCategory = async (req: CustomRequest, res: Response) => {
  try {
    let id = req.params.id;
    
    if (!req.token?.isAdmin) {
      return res.status(404).json({
        status: 404,
        message: "Your Not is Admin",
      });
    }
    const checkCategory = await CategoryModel.findAll({ where: { id } });
    if (checkCategory.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Category not found",
      });
    }
    const deletedCategory = await CategoryModel.destroy({ where: { id } });

    return res.status(201).json({
      status: 201,
      message: "success",
      data: deletedCategory,
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
  createCategory,
  getAllCategory,
  getCategoryById,
  getCategoryByName,
  updateCategory,
  deleteCategory,
};
