const ArticlesService = {
  getAllItems(knex) {
    return knex.select('*').from('shopping_list');
  },

  getById(knex, id) {
    return knex.select('*').from('shopping_list').where('id', id);
  },

  createItem(knex, item) {
    return knex.insert(item).into('shopping_list');
  },

  updateItem(knex, id, newRow) {
    return knex
      .select('*')
      .from('shopping_list')
      .where('id', id)
      .update(newRow);
  },

  deleteById(knex, id) {
    return knex.select('*').from('shopping_list').where('id', id).delete();
  }
};

module.exports = ArticlesService