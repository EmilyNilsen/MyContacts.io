module.exports = (sequelize, DataTypes) => {
  const  contact = sequelize.define('Contacts', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nome: DataTypes.STRING,
    telefone: DataTypes.INTEGER,
    email: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    data_cadastro: { type: sequelize.fn('now') },
    data_alteração: { type: sequelize.fn('now') },
  }, {
    timestamps: false,
    tableName: 'contacts',
  });
  contact.associate = (models) => {
    contact.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'userId',
      });
  };
  return contact;
}
