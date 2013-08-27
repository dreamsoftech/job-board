class AddPaymentFieldsToJob < ActiveRecord::Migration
  def up
  	add_column :jobs, :card_number, 		:string
  	add_column :jobs, :payment_method, 	:string
  	add_column :jobs, :zipcode, 				:string
  	add_column :jobs, :expire_date, 		:datetime
  	add_column :jobs, :ccvn, 						:string
  end

  def down
		remove_column :jobs, :card_number
		remove_column :jobs, :payment_method
		remove_column :jobs, :zipcode
		remove_column :jobs, :expire_date
		remove_column :jobs, :ccvn
  end
end