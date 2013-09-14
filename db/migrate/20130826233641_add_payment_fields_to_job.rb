class AddPaymentFieldsToJob < ActiveRecord::Migration
  def up
  	add_column :jobs, :invoice, 		   :string
  	add_column :jobs, :customer_email, :string
  	add_column :jobs, :customer_id, 	 :string
  	add_column :jobs, :payment_id, 		 :string
  end

  def down
		remove_column :jobs, :invoice
		remove_column :jobs, :customer_email
		remove_column :jobs, :customer_id
		remove_column :jobs, :payment_id
  end
end