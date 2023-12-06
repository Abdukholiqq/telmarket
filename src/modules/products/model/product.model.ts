import { DataTypes, Model } from "sequelize";
import sequelize from "../../../db/config";
class ProductModel extends Model{
  [x: string]: any;
}
 ProductModel.init( 
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    count:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nfc: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    ekran_chastotasi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    protsessor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    old_kamera: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orqa_kamera: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sim_karta_formati: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sim_kartalar_soni: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    operatsion_system_version: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    aloqa_standarti: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bluetooth_standarti: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vazn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    batary_power: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ekran_nisbati: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ekran_texnologiyasi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ekran_size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    doimiy_xotira: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    operativ_xotira: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    show: {
    type: DataTypes.INTEGER,
    defaultValue: 0
    },
    sold_out: {
      type: DataTypes.INTEGER,
      defaultValue: 0
      },
    MainImage: DataTypes.STRING,
    BackImage: DataTypes.STRING, 
    categoryId: DataTypes.INTEGER,
  },
  {
    sequelize,
    tableName: "products",
    underscored: true, 
   }
);

export default ProductModel