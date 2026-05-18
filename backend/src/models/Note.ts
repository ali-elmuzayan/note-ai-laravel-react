import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../db/sequelize";

interface NoteAttributes {
  id: string;
  userId: string;
  title: string;
  content: string;
  summary: string;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface NoteCreationAttributes extends Optional<
  NoteAttributes,
  "id" | "summary" | "tags" | "createdAt" | "updatedAt"
> {}

export class Note
  extends Model<NoteAttributes, NoteCreationAttributes>
  implements NoteAttributes
{
  declare id: string;
  declare userId: string;
  declare title: string;
  declare content: string;
  declare summary: string;
  declare tags: string[];
  declare createdAt: Date;
  declare updatedAt: Date;
}

Note.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "user_id",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
    },
  },
  {
    sequelize,
    tableName: "notes",
    underscored: true,
    timestamps: true,
  },
);
