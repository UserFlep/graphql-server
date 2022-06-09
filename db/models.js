import {DataTypes} from "sequelize";
import sequelize from "./db.js";

const File = sequelize.define('files', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    url: {type: DataTypes.STRING, unique: true, allowNull: false},
    mimetype: {type: DataTypes.STRING, unique: false, allowNull: false}
});

const Tag = sequelize.define('tags', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
});

const FileTag = sequelize.define('file_tags', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
});

File.belongsToMany(Tag, { through: FileTag})
Tag.belongsToMany(File, { through: FileTag})

Tag.belongsTo(Tag, {foreignKey: "parentId"})

export default {
    File,
    Tag,
    FileTag
}