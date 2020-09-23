const ArticlesService = {
  getAllItems(knex) {
    return knex.select('*').from('shopping_list');
  },

  getById(knex, id) {
    return knex
      .select('*')
      .from('shopping_list')
      .where('product_id', id)
      .first();
  },

  createItem(knex, item) {
    return knex
      .insert(item)
      .into('shopping_list')
      .returning('*')
      .then((rows) => rows[rows.length - 1]);
  },

  updateItem(knex, id, newRow) {
    return knex('shopping_list')
      .where('product_id', id)
      .update(newRow);
  },

  deleteById(knex, id) {
    return knex.select('*').from('shopping_list').where('product_id', id).delete();
  }
};

module.exports = ArticlesService