class AddAttachmentCompanyLogoToJobs < ActiveRecord::Migration
  def self.up
    change_table :jobs do |t|
      t.attachment :company_logo
    end
  end

  def self.down
    drop_attached_file :jobs, :company_logo
  end
end