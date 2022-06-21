import {DataTypes} from "sequelize";
import sequelize from "./db.js";
const  parentIdField = "parentId"
const nameField = "name"

const File = sequelize.define('files', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    url: {type: DataTypes.STRING, unique: true, allowNull: false},
    mimetype: {type: DataTypes.STRING, unique: false, allowNull: false},
    type: {type: DataTypes.STRING, unique: false, allowNull: false},
    subtype: {type: DataTypes.STRING, unique: false, allowNull: false},
    fileSize: {type: DataTypes.STRING, unique: false, allowNull: false},
    imageSize: {type: DataTypes.STRING, unique: false},
});

const Tag = sequelize.define('tags', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false},
},
{
    indexes: [
        {
            unique: true,
            fields: [nameField, parentIdField]
            //Теперь столбцы в поле fields должны иметь только уникальные сочетания
        }
    ]
});

const FileTag = sequelize.define('file_tags', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
});

File.belongsToMany(Tag, { through: FileTag})
Tag.belongsToMany(File, { through: FileTag})

//если бы связь была как childId то использовалось бы hasOne
Tag.belongsTo(Tag, {foreignKey: parentIdField})

const models = {
    File,
    Tag,
    FileTag
}

//Хз зачем этот код, видимых изменений и ошибок от него нет, но в различных примерах по sequelize он есть.
//Нашел информацию, что это устаревший код, который необходим для связывания(установки ассоциация) моделей, определенных в разных файлах
//У меня модели определены в одном файле, но пока на всякий случай оставлю это здесь
// В случае ошибок с ассоциациями раскомментировать и посмотреть на результат
//
// Object.keys(models).forEach((modelName) => {
//     if ('associate' in models[modelName]) {
//         models[modelName].associate(models);
//     }
// });

models.sequelize = sequelize;
export default models