module.exports = (sequelize, DataTypes) => {
  const  contact = sequelize.define('Contacts', {
    nome: DataTypes.STRING,
    telefone: DataTypes.BIGINT,
    email: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    data_cadastro: { type: DataTypes.DATEONLY, allowNull: false, defaultValue: DataTypes.NOW },
    data_alteracao: { type: DataTypes.DATE, allowNull: true },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  }, {
    createdAt: 'data_cadastro',
    updatedAt: 'data_alteracao',
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
