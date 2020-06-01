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
