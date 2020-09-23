require('dotenv').config();
const { expect } = require('chai');
const knex = require('knex');

const ArticlesService = require('./articlesService');

describe('Articles Service', () => {
  let db;

  let testItems = [
    {
      id: 1,
      name: 'First test item!',
      date_added: new Date('2029-01-22T16:28:32.615Z'),
      price: '12.00',
      category: 'Main'
    },
    {
      id: 2,
      name: 'Second test item!',
      date_added: new Date('2100-05-22T16:28:32.615Z'),
      price: '21.00',
      category: 'Snack'
    },
    {
      id: 3,
      name: 'Third test item!',
      date_added: new Date('1919-12-22T16:28:32.615Z'),
      price: '3.00',
      category: 'Lunch'
    },
    {
      id: 4,
      name: 'Third test item!',
      date_added: new Date('1919-12-22T16:28:32.615Z'),
      price: '0.99',
      category: 'Breakfast'
    }
  ];

  before('setup db', () => {
    db = knex({
      client: 'pg',
      connection: process.env.DB_URL
    });
  });

  before('empty table', () => db('shopping_list').truncate());

  afterEach('empty table', () => db('shopping_list').truncate());

  after('destroy connection', () => db.destroy());

  context('when data populated', () => {
    beforeEach(() => {
      return db.insert(testItems).into('shopping_list');
    });
  });

  it('getAllItems() does a thing', () => {
    const expectedResults = testItems.map((item) => ({
      ...item,
      checked: false
    }));
    return db
      .select('*')
      .from('shopping_list')
      .then(data => {
        expect(data).to.eql(expectedResults)
      })
  });

  it.skip('getById() does a thing', () => {});

  it.skip('createItem() does a thing', () => {});

  it.skip('updateItem() does a thing', () => {});

  it.skip('deleteById() does a thing', () => {});
});
