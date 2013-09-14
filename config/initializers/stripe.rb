Stripe.api_key = ENV["STRIPE_API_KEY"]
STRIPE_PUBLIC_KEY = ENV["STRIPE_PUBLIC_KEY"]

StripeEvent.setup do
  subscribe 'customer.subscription.deleted' do |event|
    user = User.find_by_customer_id(event.data.object.customer)
    user.expire
  end

  subscribe 'charge.succeed' do |event|
  	puts event.inspect
  end

  subscribe do |event|
  	data = JSON.parse(event)
  	puts data.inspect
  	puts event.inspect
  end
end