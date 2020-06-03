"use strict";

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

// Factory para Usuários
Factory.blueprint("App/Models/User", (faker, i, data) => {
  return {
    email: data.email ? data.email : faker.email({ domain: "gmail.com" }),
    password: data.password ? data.password : "henrique123",
    active: data.active ? data.active : faker.bool(),
    email_verified_at: data.email_verified_at
      ? data.email_verified_at
      : faker.date()
  };
});

// Factory para Pessoas
Factory.blueprint("App/Models/Person", (faker, i, data) => {
  return {
    name: data.name ? data.name : faker.name(),
    cpf: data.cpf
      ? data.cpf
      : `${Math.floor(10000000000 + Math.random() * 10000000001)}`,
    date_birth: data.date_birth ? data.date_birth : faker.date(),
    user_id: data.user_id ? data.user_id : 1,
    address_id: data.address_id ? data.address_id : 1
  };
});

// Factory para Endereços
Factory.blueprint("App/Models/Address", (faker, i, data) => {
  return {
    street: data.street ? data.street : faker.street({ country: "us" }),
    neightborhood: data.neightborhood
      ? data.neightborhood
      : faker.street({ country: "us" }),
    zip_code: data.zip_code ? data.zip_code : faker.zip(),
    number: data.number ? data.number : faker.integer({ min: 10, max: 1000 }),
    city_id: data.city_id ? data.city_id : faker.integer({ min: 1, max: 15 })
  };
});

// Factory para Imagens
Factory.blueprint("App/Models/Image", async (faker, i, data) => {
  return {
    path: data.path ? data.path : "public/images/products",
    size: data.size ? data.size : 1203123123,
    original_name: data.original_name ? data.original_name : "bolinho",
    extension: data.extension ? data.extension : "jpg"
  };
});

// Factory para Product Category
Factory.blueprint("App/Models/ProductCategory", async (faker, i, data) => {
  return {
    name: data.name ? data.name : faker.animal({ type: "zoo" }),
    description: data.description
      ? data.description
      : faker.sentence({ words: 20 })
  };
});

// Factory para Product
Factory.blueprint("App/Models/Product", async (faker, i, data) => {
  return {
    name: data.name ? data.name : faker.animal({ type: "zoo" }),
    description: data.description
      ? data.description
      : faker.sentence({ words: 20 }),
    price: data.price
      ? data.price
      : faker.floating({ fixed: 2, min: 1, max: 100 })
  };
});

// Factory para Cartao fidelidade
Factory.blueprint("App/Models/LoyaltyCard", async (faker, i, data) => {
  return {
    code: data.code ? data.code : faker.string({ pool: "abcdefg", length: 10 }),
    quantity: data.quantity
      ? data.quantity
      : faker.integer({ min: 0, max: 1000 }),
    value: data.value
      ? data.value
      : faker.floating({ fixed: 2, min: 0, max: 1000 }),
    type: data.type ? data.type : "cash",
    recursive: data.recursive ? data.recursive : faker.bool(),
    active: data.active ? data.active : faker.bool(),
    apply_total_order: data.apply_total_order
      ? data.apply_total_order
      : faker.bool(),
    discount_application_id: data.discount_application_id
      ? data.discount_application_id
      : 2
  };
});

// Factory para Cartao fidelidade user
Factory.blueprint("App/Models/LoyaltyCardUser", async (faker, i, data) => {
  return {
    counter: data.counter ? data.counter : faker.integer({ min: 0, max: 10 }),
    user_id: data.user_id ? data.user_id : i + 1,
    loyalty_card_id: data.loyalty_card_id ? data.loyalty_card_id : i + 1
  };
});

// Factory para Pedido
Factory.blueprint("App/Models/Order", async (faker, i, data) => {
  return {
    order_status_id: data.order_status_id
      ? data.order_status_id
      : faker.integer({ min: 1, max: 5 }),
    user_id: data.user_id ? data.user_id : faker.integer({ min: 1, max: 10 }),
    deliveryman_id: data.deliveryman_id
      ? data.deliveryman_id
      : faker.integer({ min: 11, max: 13 }),
    address_id: data.address_id
      ? data.address_id
      : faker.integer({ min: 1, max: 50 }),
    delivery_type_id: data.delivery_type_id
      ? data.delivery_type_id
      : faker.integer({ min: 1, max: 3 })
  };
});

// Factory para Pedido Produto
Factory.blueprint("App/Models/OrderProduct", async (faker, i, data) => {
  return {
    quantity: data.quantity
      ? data.quantity
      : faker.integer({ min: 1, max: 10 }),
    product_id: data.product_id
      ? data.product_id
      : faker.integer({ min: 1, max: 20 }),
    order_id: data.order_id ? data.order_id : faker.integer({ min: 1, max: 40 })
  };
});

// Factory para Cupom
Factory.blueprint("App/Models/Coupon", async (faker, i, data) => {
  let day = faker.integer({ min: 1, max: 29 });
  let monthStart = faker.integer({ min: 1, max: 3 });
  let monthEnd = faker.integer({ min: 4, max: 7 });
  let year = 2020;
  return {
    code: data.code ? data.code : faker.string({ pool: "abcdefg", length: 10 }),
    quantity: data.quantity
      ? data.quantity
      : faker.integer({ min: 0, max: 1000 }),
    value: data.value
      ? data.value
      : faker.floating({ fixed: 2, min: 0, max: 1000 }),
    type: data.type ? data.type : "cash",
    recursive: data.recursive ? data.recursive : faker.bool(),
    active: data.active ? data.active : faker.bool(),
    apply_total_order: data.apply_total_order
      ? data.apply_total_order
      : faker.bool(),
    discount_application_id: data.discount_application_id
      ? data.discount_application_id
      : 2,
    valid_from: data.valid_from
      ? data.valid_from
      : faker.date({ month: monthStart, day, year }),
    valid_until: data.valid_until
      ? data.valid_until
      : faker.date({ month: monthEnd, day, year })
  };
});
