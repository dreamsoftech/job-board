class AddFieldsToJob < ActiveRecord::Migration
  def up
  	add_column :jobs, :tags, 					:string
  	add_column :jobs, :company_logo, 	:string
  	add_column :jobs, :highlighted, 	:boolean, default: false
  end

  def down
		remove_column :jobs, :tags
		remove_column :jobs, :company_logo
		remove_column :jobs, :highlighted
  end
end