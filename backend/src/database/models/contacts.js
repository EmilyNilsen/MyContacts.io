module.exports = (sequelize, DataTypes) => {
  const  contact = sequelize.define('Contacts', {
    nome: DataTypes.STRING,
    telefone: DataTypes.BIGINT,
    email: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    data_cadastro: { type: sequelize.fn('now') },
    data_alteração: { type: sequelize.fn('now') },
  }, {
    createdAt: 'data_cadastro',
    updatedAt: 'data_alteração',
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
