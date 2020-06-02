"use strict";

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

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
