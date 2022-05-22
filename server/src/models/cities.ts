import { Model, DataTypes, Optional } from "sequelize";

import { IPointType } from "@interfaces/common";

import db from "@packages/sequelize";

import { ICitiesAttributes } from "@interfaces/cities";

// Some attributes are optional in the model
interface CityCreationAttributes
  extends Optional<
    ICitiesAttributes,
    "id" | "state" | "country" | "createdAt" | "updatedAt"
  > {}
export class CityInstance
  extends Model<ICitiesAttributes, CityCreationAttributes>
  implements ICitiesAttributes
{
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.

  public name!: string;
  public state!: string;
  public country!: string;

  public point!: IPointType;

  // timestamps!
  public createdAt!: Date;
  public updatedAt!: Date;
}

const City = db.sequelize.define<CityInstance>(
  "cities",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: new DataTypes.STRING(100),
      allowNull: false,
    },

    state: {
      type: new DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "",
    },

    country: {
      type: new DataTypes.STRING(3),
      allowNull: false,
      defaultValue: "",
    },

    point: {
      type: DataTypes.GEOMETRY("POINT", 4326),
      allowNull: false,
    },

    createdAt: {
      type: db.Sequelize.DATE,
      allowNull: false,
      defaultValue: db.Sequelize.fn("NOW"),
    },
    updatedAt: {
      type: db.Sequelize.DATE,
      allowNull: false,
      defaultValue: db.Sequelize.fn("NOW"),
    },
  },
  {
    timestamps: true,
    tableName: "cities",
    indexes: [
      {
        type: "SPATIAL",
        fields: ["point"],
      },
    ],
  }
);

export default City;
