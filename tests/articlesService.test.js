require('dotenv').config();
const { expect } = require('chai');
const knex = require('knex');

const ArticlesService = require('./articlesService');
const { getById } = require('./articlesService');

describe('Articles Service', () => {
  let db;

  let testItems = [
    {
    
      name: 'First test item!',
      date_added: new Date('2029-01-22T16:28:32.615Z'),
      price: '12.00',
      category: 'Main'

    },
    {
    
      name: 'Second test item!',
      date_added: new Date('2100-05-22T16:28:32.615Z'),
      price: '21.00',
      category: 'Snack'
    },
    {
      name: 'Third test item!',
      date_added: new Date('1919-12-22T16:28:32.615Z'),
      price: '3.00',
      category: 'Lunch'
    },
    {
      name: 'Third test item!',
      date_added: new Date('1919-12-22T16:28:32.615Z'),
      price: '0.99',
      category: 'Breakfast'
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
    beforeEach(() => {
      return db.into('shopping_list').insert(testItems);
    });


  it.skip('getAllItems() does a thing', () => {
    const expectedResults = testItems.map((item, index) => ({
      ...item, 
      checked: false,
      product_id: index +1
    }));
    return ArticlesService.getAllItems(db)
      .then(data => {
        expect(data).to.eql(expectedResults)
      })
  });

  it('getById() does a thing', () => {
    const searchId = 3
    const expectedResults= [testItems[searchId-1]]
    expectedResults[0].product_id=searchId
    expectedResults[0].checked=false
    return ArticlesService.getById(db, searchId)
      .then(data=>{
        expect(data).to.eql(expectedResults)
      })

  });

  it.skip('createItem() does a thing', () => {

  });

  it('updateItem() does a thing', () => {
    const updateId=3
    const newItem=
    {
      name: 'test update item!',
      price: '0.98',
      date_added: new Date(),
      checked: true,
      category: 'Lunch',
    }
    const expectedResults=[{...newItem, product_id: updateId}]
    return ArticlesService.updateItem(db, updateId, newItem)
      .then(()=>ArticlesService.getById(db, updateId))
      .then(data=>{
        expect(data).to.eql(expectedResults)
      })
  });
  

  it.skip('deleteById() does a thing', () => {});
});

});
