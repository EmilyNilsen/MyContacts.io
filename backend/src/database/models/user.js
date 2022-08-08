module.exports = (sequelize, DataTypes) => {
  const  user = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    timestamps: false,
    tableName: 'users',
  });

  user.associate = (models) => {
    user.hasMany(models.Contacts, {
      as: 'contacts',
      foreingnKey: 'userId',
    });
  };
  return user;
}
