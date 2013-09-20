jQuery.externalScript = function(url, options) {
  options = $.extend(options || {}, {
    dataType: "script",
    cache: true,
    url: url
  });
  return jQuery.ajax(options);
};

$('#payment_form').ready(function() {
  $.externalScript('https://js.stripe.com/v1/').done(function(script, textStatus) {
      Stripe.setPublishableKey($('meta[name="stripe-key"]').attr('content'));
      
      var subscription = {
        setupForm: function() {
          return $('#payment_submit').click(function() {
            if ($("#stripe_token").val() == "")
            {  
              $('#payment_submit').prop('disabled', true);
              subscription.processCard();
              return false;
            }
            else
              return true;
          });
        },
        processCard: function() {
          var card;
          card = {
            number: $('#card_number').val(),
            cvc: $('#ccvn').val(),
            expMonth: $('#card_month').val(),
            expYear: $('#card_year').val()
          };
          return Stripe.createToken(card, subscription.handleStripeResponse);
        },
        handleStripeResponse: function(status, response) {
          if (status == 200) {
            $('#stripe_token').val(response.id);
            $('#payment_form').submit();
          } else {
            $('#stripe_error').text(response.error.message).show();
            return $('#payment_submit').prop('disabled', false);
          }
        }
      };
      return subscription.setupForm();
  });
});