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
    },
  ];

  before('setup db', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    });
  });

  before('empty table', () => db('').truncate());

  afterEach('empty table', () => db('').truncate());

  after('destroy connection', () => db.destroy());

  describe('getAllArticles', () => {
    context('when data populated', () => {
      beforeEach('insert test articles', () => {});
    });

    it('happyPath', () => {});

    it('happyPath', () => {});
  });
});
