"use strict";

const UsedLoyaltyCard = use("App/Models/UsedLoyaltyCard");
const LoyaltyCard = use("App/Models/LoyaltyCard");

const OrderHook = (exports = module.exports = {});

/**
 * Converte float para padrão usado
 *
 * @param {Float} value
 * @return {Float} Valor formatado
 */
const toFloat = (value) => parseFloat(parseFloat(value).toFixed(2));

/**
 * Aplica desconto do cartão fidelidade
 *
 * @param {Lucid} orderProduct Lucid com os produtos do pedido
 * @param {Lucid} loyaltyCard Lucid com o cartão fidelidade usado
 * @param {Float} discount Desconto acumulado
 * @returns {Array}
 * @returns {Array.0} Desconto calculado
 * @returns {Array.1} Informação do cartão fidelidade
 */
const validLoyaltyCard = async (orderProduct, loyaltyCard, discount) => {
  // Objeto com informações do loyalty card
  let loyaltyCardApplied = {
    id: loyaltyCard.id,
    code: loyaltyCard.code,
    value: toFloat(loyaltyCard.value),
    type: loyaltyCard.type,
    recursive: loyaltyCard.recursive,
    apply_total_order: loyaltyCard.apply_total_order,
    apply_products: [],
    apply_product_categories: []
  };
  // Pega todos os produtos viculado ao loyalty card
  let loyaltyCardProducts = (await loyaltyCard.products().fetch()).toJSON();
  // Pega todos as categoriasa viculado ao loyalty card
  let loyaltyCardProductCategories = (
    await loyaltyCard.productCategories().fetch()
  ).toJSON();

  // Se o cartão fidelidade não é aplicado a todos os pedidos
  if (!loyaltyCard.apply_total_order) {
    // Se o tipo do cartão fidelidade for percent
    if (loyaltyCard.type === "percent") {
      // Mapeia produtos e verifica aplicação do cartão fidelidade
      await orderProduct.rows.map(async (product) => {
        // Pega as categorias do produto atual
        let productcategories_Product = await product
          .productCategories()
          .fetch();

        // Verifica se entre as categorias do cartão fidelidade está uma das categorias do produto atual
        let loyaltyCardProductCategoriesCheck = loyaltyCardProductCategories.find(
          (value) =>
            productcategories_Product.rows.map(
              (category) => category.id === value.id
            )
        );
        // Verifica se  o produto atual está vinculado ao coupon
        let loyaltyCardProductsCheck = loyaltyCardProducts.find(
          (value) => product.id === value.id
        );
        // Se o produto atual estiver vinculado ao cupon então
        if (loyaltyCardProductsCheck) {
          loyaltyCardApplied.apply_products.push(product.toJSON());
          discount = toFloat(
            toFloat(
              (toFloat(
                toFloat(product.$relations.pivot.quantity) *
                  toFloat(product.price)
              ) *
                toFloat(loyaltyCard.value)) /
                100
            ) + parseFloat(discount)
          );
        } else {
          // O uma das categorias do produto estiver vinculado a uma das categorias do coupon entao
          if (loyaltyCardProductCategoriesCheck) {
            loyaltyCardApplied.apply_product_categories.push(product.toJSON());
            discount = toFloat(
              toFloat(
                (toFloat(
                  toFloat(product.$relations.pivot.quantity) *
                    toFloat(product.price)
                ) *
                  toFloat(loyaltyCard.value)) /
                  100
              ) + parseFloat(discount)
            );
          }
        }
      });
    } else {
      // Mapeia produtos e verifica aplicação do cartão fidelidade
      await orderProduct.rows.map(async (product) => {
        // Pega as categorias do produto atual
        let productcategories_Product = await product
          .productCategories()
          .fetch();

        // Verifica se entre as categorias do cartão fidelidade está uma das categorias do produto atual
        let loyaltyCardProductCategoriesCheck = loyaltyCardProductCategories.find(
          (value) =>
            productcategories_Product.rows.map(
              (category) => category.id === value.id
            )
        );
        // Verifica se  o produto atual está vinculado ao loyaltyCard
        let loyaltyCardProductsCheck = loyaltyCardProducts.find(
          (value) => product.id === value.id
        );
        // Se o produto atual estiver vinculado ao loyaltyCard então
        if (loyaltyCardProductsCheck) {
          loyaltyCardApplied.apply_products.push(product.toJSON());
          discount = toFloat(
            toFloat(
              toFloat(product.$relations.pivot.quantity) *
                toFloat(loyaltyCard.value)
            ) + parseFloat(discount)
          );
        } else {
          // O uma das categorias do produto estiver vinculado a uma das categorias do loyaltyCard entao
          if (loyaltyCardProductCategoriesCheck) {
            loyaltyCardApplied.apply_product_categories.push(product.toJSON());
            discount = toFloat(
              toFloat(
                toFloat(product.$relations.pivot.quantity) *
                  toFloat(loyaltyCard.value)
              ) + parseFloat(discount)
            );
          }
        }
      });
    }
  } else {
    // Se o tipo do coupon for percent
    if (loyaltyCard.type === "percent") {
      // Mapeia produtos e verifica aplicação do coupon
      let products = await Promise.all(
        orderProduct.rows.map(async (product) => {
          // Pega as categorias do produto atual
          let productcategories_Product = await product
            .productCategories()
            .fetch();

          // Verifica se entre as categorias do cartão fidelidade está uma das categorias do produto atual
          let loyaltyCardProductCategoriesCheck = loyaltyCardProductCategories.find(
            (value) =>
              productcategories_Product.rows.map(
                (category) => category.id === value.id
              )
          );
          // Verifica se  o produto atual está vinculado ao coupon
          let loyaltyCardProductsCheck = loyaltyCardProducts.find(
            (value) => product.id === value.id
          );
          // Se o produto atual estiver vinculado ao cupon então
          if (loyaltyCardProductsCheck) {
            loyaltyCardApplied.apply_products.push(product.toJSON());
            return toFloat(
              toFloat(product.$relations.pivot.quantity) *
                toFloat(product.price)
            );
          }
          // O uma das categorias do produto estiver vinculado a uma das categorias do coupon entao
          else if (loyaltyCardProductCategoriesCheck) {
            loyaltyCardApplied.apply_product_categories.push(product.toJSON());
            return toFloat(
              toFloat(product.$relations.pivot.quantity) *
                toFloat(product.price)
            );
          }
        })
      );
      discount = toFloat(
        toFloat(
          (toFloat(
            products.reduce((accumulator, current) => accumulator + current)
          ) *
            loyaltyCard.value) /
            100
        ) + toFloat(discount)
      );
    } else {
      // Mapeia produtos e verifica aplicação do coupon
      let products = await Promise.all(
        orderProduct.rows.map(async (product) => {
          // Pega as categorias do produto atual
          let productcategories_Product = await product
            .productCategories()
            .fetch();

          // Verifica se entre as categorias do cartão fidelidade está uma das categorias do produto atual
          let loyaltyCardProductCategoriesCheck = loyaltyCardProductCategories.find(
            (value) =>
              productcategories_Product.rows.map(
                (category) => category.id === value.id
              )
          );
          // Verifica se  o produto atual está vinculado ao coupon
          let loyaltyCardProductsCheck = loyaltyCardProducts.find(
            (value) => product.id === value.id
          );
          // Se o produto atual estiver vinculado ao cupon então
          if (loyaltyCardProductsCheck) {
            loyaltyCardApplied.apply_products.push(product.toJSON());
            return toFloat(
              toFloat(product.$relations.pivot.quantity) *
                toFloat(product.price)
            );
          }
          // O uma das categorias do produto estiver vinculado a uma das categorias do coupon entao
          else if (loyaltyCardProductCategoriesCheck) {
            loyaltyCardApplied.apply_product_categories.push(product.toJSON());
            return toFloat(
              toFloat(product.$relations.pivot.quantity) *
                toFloat(product.price)
            );
          }
        })
      );
      products.length > 0
        ? (discount = toFloat(toFloat(loyaltyCard.value) + discount))
        : null;
    }
  }
  return [discount, loyaltyCardApplied];
};

/**
 * Aplica desconto do cartão fidelidade e dos cupons
 *
 * @param {*} order
 */
OrderHook.UpdateValues = async (order) => {
  // Verifica se este pedido possui aplicação de cartão fidelidade
  const usedLoyaltyCard = await UsedLoyaltyCard.findBy("order_id", order.id);
  // Verifica se tem coupon aplicados
  const coupons = await order.coupons().fetch();

  const orderProduct = await order.products().fetch();

  let value = {};
  orderProduct.rows.length > 0
    ? (value.total = toFloat(
        orderProduct.rows
          .map((product) => {
            let quantity = toFloat(product.$relations.pivot.quantity);

            let price = product.price;
            return price * quantity;
          })
          .reduce((accumulator, current) => accumulator + current)
      ))
    : (value.total = null);
  value.discount = 0;
  value.coupons = [];

  if (usedLoyaltyCard) {
    // Pega as caracteristica do cartão fidelidade
    const loyaltyCard = await LoyaltyCard.find(usedLoyaltyCard.loyalty_card_id);

    let validLoyaltyCardReturn = await validLoyaltyCard(
      orderProduct,
      loyaltyCard,
      value.discount
    );

    value.discount = validLoyaltyCardReturn[0];
    value.loyalty_card = validLoyaltyCardReturn[1];
    // Se existir coupon
    if (coupons.rows.length > 0) {
      await Promise.all(
        // Mapeia coupons
        coupons.rows.map(async (coupon) => {
          // Objeto com informações do cupom atual
          let couponApplied = {
            id: coupon.id,
            code: coupon.code,
            value: toFloat(coupon.value),
            type: coupon.type,
            recursive: coupon.recursive,
            apply_total_order: coupon.apply_total_order,
            apply_products: [],
            apply_product_categories: []
          };
          // JSON com os produtos vinculada ao coupon
          let couponProducts = (await coupon.products().fetch()).toJSON();
          // JSON com as categorias vinculada ao coupon
          let couponProductCategories = (
            await coupon.productCategories().fetch()
          ).toJSON();
          // Se o coupon não é aplicado a todos os pedidos
          if (!coupon.apply_total_order) {
            // Se o tipo do coupon for percent
            if (coupon.type === "percent") {
              // Mapeia produtos e verifica aplicação do coupon
              await orderProduct.rows.map(async (product) => {
                // Pega as categorias do produto atual
                let productcategories_Product = await product
                  .productCategories()
                  .fetch();

                // Verifica se entre as categorias do coupon está uma das categorias do produto atual
                let categoryProductCheck = couponProductCategories.find(
                  (value) =>
                    productcategories_Product.rows.map(
                      (category) => category.id === value.id
                    )
                );
                // Verifica se  o produto atual está vinculado ao coupon
                let couponProductCheck = couponProducts.find(
                  (value) => product.id === value.id
                );
                // Se o produto atual estiver vinculado ao cupon então
                if (couponProductCheck) {
                  couponApplied.apply_products.push(product.toJSON());

                  value.discount = toFloat(
                    toFloat(
                      (toFloat(
                        toFloat(product.$relations.pivot.quantity) *
                          toFloat(product.price)
                      ) *
                        toFloat(coupon.value)) /
                        100
                    ) + parseFloat(value.discount)
                  );
                } else {
                  // O uma das categorias do produto estiver vinculado a uma das categorias do coupon entao
                  if (categoryProductCheck) {
                    couponApplied.apply_product_categories.push(
                      product.toJSON()
                    );

                    value.discount = toFloat(
                      toFloat(
                        (toFloat(
                          toFloat(product.$relations.pivot.quantity) *
                            toFloat(product.price)
                        ) *
                          toFloat(coupon.value)) /
                          100
                      ) + parseFloat(value.discount)
                    );
                  }
                }
              });
            } else {
              // Mapeia produtos e verifica aplicação do coupon
              await orderProduct.rows.map(async (product) => {
                // Pega as categorias do produto atual
                let productcategories_Product = await product
                  .productCategories()
                  .fetch();

                // Verifica se entre as categorias do coupon está uma das categorias do produto atual
                let categoryProductCheck = couponProductCategories.find(
                  (value) =>
                    productcategories_Product.rows.map(
                      (category) => category.id === value.id
                    )
                );
                // Verifica se  o produto atual está vinculado ao coupon
                let couponProductCheck = couponProducts.find(
                  (value) => product.id === value.id
                );
                // Se o produto atual estiver vinculado ao cupon então
                if (couponProductCheck) {
                  couponApplied.apply_products.push(product.toJSON());
                  value.discount = toFloat(
                    toFloat(
                      toFloat(product.$relations.pivot.quantity) *
                        toFloat(coupon.value)
                    ) + parseFloat(value.discount)
                  );
                } else {
                  couponApplied.apply_product_categories.push(product.toJSON());
                  // O uma das categorias do produto estiver vinculado a uma das categorias do coupon entao
                  if (categoryProductCheck) {
                    value.discount = toFloat(
                      toFloat(
                        toFloat(product.$relations.pivot.quantity) *
                          toFloat(coupon.value)
                      ) + parseFloat(value.discount)
                    );
                  }
                }
              });
            }
          } else {
            // Se o tipo do coupon for percent
            if (coupon.type === "percent") {
              // Mapeia produtos e verifica aplicação do coupon
              let products = await Promise.all(
                orderProduct.rows.map(async (product) => {
                  // Pega as categorias do produto atual
                  let productcategories_Product = await product
                    .productCategories()
                    .fetch();

                  // Verifica se entre as categorias do coupon está uma das categorias do produto atual
                  let categoryProductCheck = couponProductCategories.find(
                    (value) =>
                      productcategories_Product.rows.map(
                        (category) => category.id === value.id
                      )
                  );

                  // Verifica se  o produto atual está vinculado ao coupon
                  let couponProductCheck = couponProducts.find(
                    (value) => product.id === value.id
                  );

                  // Se o produto atual estiver vinculado ao cupon então
                  if (couponProductCheck) {
                    couponApplied.apply_products.push(product.toJSON());
                    return toFloat(
                      toFloat(product.$relations.pivot.quantity) *
                        toFloat(product.price)
                    );
                  }
                  // O uma das categorias do produto estiver vinculado a uma das categorias do coupon entao
                  else if (categoryProductCheck) {
                    couponApplied.apply_product_categories.push(
                      product.toJSON()
                    );
                    return toFloat(
                      toFloat(product.$relations.pivot.quantity) *
                        toFloat(product.price)
                    );
                  }
                })
              );

              value.discount = toFloat(
                toFloat(
                  (toFloat(
                    products.reduce(
                      (accumulator, current) => accumulator + current
                    )
                  ) *
                    coupon.value) /
                    100
                ) + toFloat(value.discount)
              );
            } else {
              // Mapeia produtos e verifica aplicação do coupon
              let products = await Promise.all(
                orderProduct.rows.map(async (product) => {
                  // Pega as categorias do produto atual
                  let productcategories_Product = await product
                    .productCategories()
                    .fetch();

                  // Verifica se entre as categorias do coupon está uma das categorias do produto atual
                  let categoryProductCheck = couponProductCategories.find(
                    (value) =>
                      productcategories_Product.rows.map(
                        (category) => category.id === value.id
                      )
                  );

                  // Verifica se  o produto atual está vinculado ao coupon
                  let couponProductCheck = couponProducts.find(
                    (value) => product.id === value.id
                  );

                  // Se o produto atual estiver vinculado ao cupon então
                  if (couponProductCheck) {
                    couponApplied.apply_products.push(product.toJSON());
                    return toFloat(
                      toFloat(product.$relations.pivot.quantity) *
                        toFloat(product.price)
                    );
                  }
                  // O uma das categorias do produto estiver vinculado a uma das categorias do coupon entao
                  else if (categoryProductCheck) {
                    couponApplied.apply_product_categories.push(
                      product.toJSON()
                    );
                    return toFloat(
                      toFloat(product.$relations.pivot.quantity) *
                        toFloat(product.price)
                    );
                  }
                })
              );

              products.length > 0
                ? (value.discount = toFloat(
                    toFloat(coupon.value) + value.discount
                  ))
                : null;
            }
          }
          value.coupons.push(couponApplied);
        })
      );
    }
  }

  // Atribui informação do valor total que foi pago
  value.change_cash = toFloat(
    order.amount_will_paid - value.total - value.discount
  );

  order.total = value;
};
