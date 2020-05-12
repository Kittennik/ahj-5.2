import ProductsBase from '../goods';

test('Add', () => {
  const products = new ProductsBase();
  products.add({
    name: 'Бабушкафон',
    price: 100,
  });

  expect(products.products[3].name).toBe('Бабушкафон');
});
