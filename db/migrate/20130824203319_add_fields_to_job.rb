class AddFieldsToJob < ActiveRecord::Migration
  def up
  	add_column :jobs, :tags, 					:string
    add_column :jobs, :highlighted1,  :boolean, default: false
    add_column :jobs, :highlighted2,  :boolean, default: false
  	add_column :jobs, :highlighted3, 	:boolean, default: false
  end

  def down
		remove_column :jobs, :tags
    remove_column :jobs, :highlighted1
    remove_column :jobs, :highlighted2
		remove_column :jobs, :highlighted3
  end
end