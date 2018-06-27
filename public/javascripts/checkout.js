Stripe.setPublishableKey('pk_test_X2frqUdA9JYQIhafUv2eGbsL')

var $form = $('checkout-form')

$form.submit(function (event) {
  $form.find('button').prop('disabled', true)
})

Stripe.card.createToken({
  name: $('.name'),
  number: $('.card-number').val(),
  cvc: $('.card-cvc').val(),
  exp_month: $('.card-expiry-month').val(),
  exp_year: $('.card-expiry-year').val()
}, stripeResponseHandler)

function stripeResponseHandler (status, response) {
  // Grab the form:
  if (response.error) { // Problem!
    // Show the errors on the form
    $form.find('.payment-errors').text(response.error.message)
    $form.find('button').prop('disabled', false) // Re-enable submission

  } else { // Token was created!
    // Get the token ID:
    var token = response.id

    // Insert the token into the form so it gets submitted to the server:
    $form.append($('<input type="hidden" name="stripeToken" />').val(token))

    // Submit the form:
    $form.get(0).submit()

  }
}
