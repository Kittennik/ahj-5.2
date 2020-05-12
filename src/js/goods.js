export default class ProductsBase {
  constructor() {
    this.products = [{
      name: 'iPhone XR',
      price: 60000,
    },
    {
      name: 'Samsung Galaxy S10+',
      price: 80000,
    },
    {
      name: 'Huawei View',
      price: 50000,
    }];
  }

  del(product) {
    this.products.splice(this.products.findIndex((element) => element.name === product.name), 1);
  }

  add(product) {
    const index = this.products.findIndex((element) => element.name === product.name);
    index !== -1 ? this.goods[index] = product : this.products.push(product);
  }
}
