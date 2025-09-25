import { cart } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { formatCurrency } from '../utils/money.js';
import { addOrder } from '../../data/orders.js';

export function renderPaymentSummary() {
  let productPriceCent = 0;
  let shippingPriceCents = 0;
  let itemTotal = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCent += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;

    const totalItem = cartItem.productId;
    itemTotal += cartItem.quantity;
  });

  let checkOut = `Checkout <a class="return-to-home-link "
            href="amazon.html"> (${itemTotal} items) </a>`;

  const totalBeforeTaxCents = productPriceCent + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  const paymentSummaryhtml = `
         
         <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row js-payment-summary-row">
            <div>Items (${itemTotal}):</div>
            <div class="payment-summary-money">
            $${formatCurrency(productPriceCent)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(
              shippingPriceCents
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalBeforeTaxCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(
              taxCents
            )}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalCents
            )}</div>
          </div>

          <button class="place-order-button button-primary js-place-order-button">
            Place your order
          </button>
  `;

  document.querySelector('.js-checkout-items').innerHTML = checkOut;

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryhtml;

  document
    .querySelector('.js-place-order-button')
    .addEventListener('click', async () => {
      try {
        const response = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cart: cart,
          }),
        });
        const order = await response.json();
        addOrder(order);
      } catch (error) {
        console.log('unexpected error');
      }

      window.location.href = 'orders.html';
    });
}
