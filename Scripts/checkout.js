import { renderOrderSummary } from './Checkout/orderSummary.js';
import { renderPaymentSummary } from './Checkout/paymentSummary.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js';
// import '../data/cart-class.js';
// import '../data/backaend-practice.js';

async function loadPage() {
  try {
    // throw 'error 1';

    await loadProductsFetch();
    const value = await new Promise((resolve, reject) => {
      // throw 'error 2';
      loadCart(() => {
        // reject('error 3');
        resolve('value 3');
      });
    });
  } catch (error) {
    console.error('An error occurred while loading the products.');
  }

  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();
/*

Promise.all([
  loadProductsFetch(),

  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }),
]).then((values) => {
  console.log(values);
  renderOrderSummary();
  renderPaymentSummary();
});

*/

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1');
  });
})
  .then((value) => {
    console.log(value);
    return new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    });
  })
  .then(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });



loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/
