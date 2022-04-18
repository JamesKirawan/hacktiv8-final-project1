"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("Reflections", {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        success: {
          type: Sequelize.STRING,
        },
        low_point: {
          type: Sequelize.STRING,
        },
        take_away: {
          type: Sequelize.STRING,
        },
        user_id: {
          type: Sequelize.UUID,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(() =>
        queryInterface.addConstraint("Reflections", {
          fields: ["user_id"],
          type: "foreign key",
          name: "user_fk",
          references: {
            table: "Users",
            field: "id",
          },
          onDelete: "cascade",
          onUpdate: "cascade",
        })
      );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface
      .dropTable("Reflections")
      .then(() => queryInterface.removeConstraint("Reflections", "user_fk"));
  },
};
