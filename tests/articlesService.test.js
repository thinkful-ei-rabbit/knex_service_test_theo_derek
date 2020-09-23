require('dotenv').config();
const { expect } = require('chai');
const knex = require('knex');

const ArticlesService = require('./articlesService');
const { getById } = require('./articlesService');

describe('Articles Service', () => {
  let db;

  let testItems = [
    {
      category: 'Main',
      date_added: new Date('2029-01-22T16:28:32.615Z'),
      name: 'First test item!',
      price: '12.00'
    },
    {
      category: 'Snack',
      date_added: new Date('2100-05-22T16:28:32.615Z'),
      name: 'Second test item!',
      price: '21.00'
    },
    {
      category: 'Lunch',
      date_added: new Date('1919-12-22T16:28:32.615Z'),
      name: 'Third test item!',
      price: '3.00'
    },
    {
      category: 'Breakfast',
      date_added: new Date('1919-12-22T16:28:32.615Z'),
      name: 'Third test item!',
      price: '0.99'
    }
  ];

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.DB_URL
    });
  });

  before(() => db('shopping_list').truncate());

  afterEach(() => db('shopping_list').truncate());

  after(() => db.destroy());

  context('when data populated', () => {
    beforeEach(() => db.into('shopping_list').insert(testItems));

    it('getAllItems() does a thing', () => {
      const expectedResults = testItems.map((item, index) => ({
        ...item,
        checked: false,
        product_id: index + 1
      }));
      return ArticlesService.getAllItems(db).then((data) => {
        expect(data).to.eql(expectedResults);
      });
    });

    it('getById() does a thing', () => {
      const searchId = 3;
      const thirdItem = testItems[searchId - 1];
      return ArticlesService.getById(db, searchId).then((data) => {
        expect(data).to.eql({
          product_id: searchId,
          name: thirdItem.name,
          price: thirdItem.price,
          date_added: thirdItem.date_added,
          checked: false,
          category: thirdItem.category
        });
      });
    });

    it('updateItem() does a thing', () => {
      const updateId = 3;
      const newItem = {
        category: 'Lunch',
        date_added: new Date(),
        name: 'test update item!',
        price: '0.98',
        checked: true
      };
      const expectedResults = { ...newItem, product_id: updateId };
      return ArticlesService.updateItem(db, updateId, newItem)
        .then(() => ArticlesService.getById(db, updateId))
        .then((data) => {
          expect(data).to.eql(expectedResults);
        });
    });

    it('deleteById() does a thing', () => {
      const searchId = 3;

      return ArticlesService.deleteById(db, searchId)
        .then(() => ArticlesService.getAllItems(db))
        .then((data) => {
          const newTestData = testItems
            .map((item, index) => ({
              ...item,
              checked: false,
              product_id: index + 1
            }))
            .filter((_, idx) => idx !== searchId - 1);

          expect(data).to.eql(newTestData);
        });
    });
  });

  context('no data in db', () => {
    it('getAllItem() returns empty []', () => {
      return ArticlesService.getAllItems(db).then((data) => {
        expect(data).to.eql([]);
      });
    });

    it('createItem() does a thing', () => {
      const newItem = {
        category: 'Lunch',
        date_added: new Date(),
        name: 'test update item!',
        price: '0.98',
        checked: true
      };
      return ArticlesService.createItem(db, newItem).then((data) => {
        expect(data).to.eql({
          ...newItem,
          product_id: 1
        });
      });
    });
  });
});
