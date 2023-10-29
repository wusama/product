/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  // Create the "role" table
  await knex.schema.createTable("role", (table) => {
    table.increments("id").primary(); // Auto-incrementing role ID (Primary Key)
    table.string("name").notNullable().unique(); // Role name
    table.string("description"); // Role description (optional)
    table.timestamps(true, true); // Created_at and updated_at timestamps
  });

  // Insert the default roles
  await knex("role").insert([
    { name: "system", description: "System Role" },
    { name: "admin", description: "Admin Role" },
    { name: "user", description: "User Role" },
    { name: "guest", description: "Guest Role" },
  ]);

  // Create the "user_role" table
  await knex.schema.createTable("user_role", (table) => {
    table.increments("id").primary(); // Auto-incrementing relation ID (Primary Key)
    table.integer("user_id").unsigned().notNullable(); // User ID (foreign key)
    table.integer("role_id").unsigned().notNullable(); // Role ID (foreign key)
    table.timestamps(true, true); // Created_at and updated_at timestamps

    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .foreign("role_id")
      .references("id")
      .inTable("role")
      .onDelete("CASCADE");
  });

  // Find all users from the "users" table
  const users = await knex.select("id").from("users");

  // Assign the "system" role to all users
  const systemRole = await knex("role").where("name", "system").first();
  if (systemRole) {
    const systemRoleId = systemRole.id;
    for (const user of users) {
      await knex("user_role").insert({
        user_id: user.id,
        role_id: systemRoleId,
      });
    }
  }

  // Assign the "admin" role to all users
  const adminRole = await knex("role").where("name", "admin").first();
  if (adminRole) {
    const adminRoleId = adminRole.id;
    for (const user of users) {
      await knex("user_role").insert({
        user_id: user.id,
        role_id: adminRoleId,
      });
    }
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("user_role").then(() => {
    return knex.schema.dropTable("role");
  });
};
