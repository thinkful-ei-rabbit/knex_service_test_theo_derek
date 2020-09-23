/* eslint-disable no-unused-vars, no-console */
require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

const searchByName = (searchTerm) => {
  knexInstance
    .select('*')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then((data) => console.log(data))
    .finally(() => knexInstance.destroy());
};

// searchByName('fi')

const pageNumber = (page) => {
  const pageLimit = 6;
  const offset = pageLimit * (page - 1);
  knexInstance
    .select('*')
    .from('shopping_list')
    .limit(pageLimit)
    .offset(offset)
    .then((data) => console.log(data))
    .finally(() => knexInstance.destroy());
};

// pageNumber(2)

const searchByDate = (daysAgo) => {
  knexInstance
    .select('*')
    .from('shopping_list')
    .where(
      'date_added',
      '>',
      knexInstance.raw(`now() - '?? days':: INTERVAL`, daysAgo)
    )
    .then((data) => console.log(data))
    .finally(() => knexInstance.destroy());
};

// searchByDate(1);

const costPerCatagory = () => {
  knexInstance
    .select('catagory')
    .sum('price AS total')
    .from('shopping_list')
    .groupBy('catagory')
    .then((data) => console.log(data))
    .catch(error => console.log(error))
    .finally(() => knexInstance.destroy());
};

costPerCatagory();
