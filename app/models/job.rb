# -*- encoding : utf-8 -*-
# == Schema Information
#
# Table name: jobs
#
#  id                :integer          not null, primary key
#  title             :string(255)
#  job_type          :string(255)
#  occupation        :string(255)
#  company_name      :string(255)
#  location          :string(255)
#  url               :string(255)
#  description       :text
#  apply_information :text
#  deadline          :date
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  aasm_state        :string(255)
#

class Job < ActiveRecord::Base
  
  attr_accessor :deadline_forever
  attr_accessible :title, :job_type, :tags, :occupation, :company_name, :company_logo, :url, :location, :description, :apply_information, :highlighted1, :highlighted2, :highlighted3, :payment_method, :card_number, :ccvn, :expire_date, :zipcode

  has_attached_file :company_logo, :styles => { :medium => "150x150>" }, 
    storage: :dropbox,
    dropbox_credentials: Rails.root.join("config/dropbox.yml"),
    default_url: "/assets/missing.jpg", 
    path: "upload/:class/:attachment/:style/:filename"

  extend Searchable
  searchable_by :title, :job_type, :tags, :company_name, :url, :location, :description, :apply_information
  
  validates_presence_of :title
  validates_presence_of :job_type
  validates_presence_of :company_name
  validates_presence_of :location
  validates_presence_of :description
  validates_presence_of :apply_information
  # validates_presence_of :owner
  
  # validates_format_of :description, :with => /(ruby|rails)/i, :message => "Doesn't seem to be a Ruby or Rails related job"
  TAGS = ['','jquery', 'sql', 'c#', 'python', 'java', 'c++', 'objective C', 'ruby on rails',
          'android', 'php', 'perl', 'mysql', 'jquery', 'html5', 'css', 'mongo db', 'oracle']

  JOB_TYPE = ['Full-time', 'Part-time', 'App project']
  # OCCUPATION = ['Web back-end', 'Web front-end', 'Web-design',
  #               'QA/Testing', 'Other']
  SEARCH_TERMS = ['Date Posted', "Company Name", "Job Title"]

  # validates_inclusion_of :job_type, :in => JOB_TYPE 
  # validates_inclusion_of :occupation, :in => OCCUPATION

  before_validation :set_aasm_state, :on => :create
  before_validation :set_deadline
  
  scope :published , where(:aasm_state => "published")
  scope :online, published.where("deadline is NULL or deadline > ?", Date.today )
  scope :order_by_date, :order => "id DESC"
  scope :order_by_company_name, :order => "company_name ASC"
  scope :order_by_job_title, :order => "title ASC"
  
  def open
    self.aasm_state = "published"
  end
  
  def close
    self.aasm_state = "closed"
  end
  
  def closed?
    self.aasm_state == "closed"
  end
  
  def expired
    return true if elapsed_date > 30
    return false;
  end

  def to_param
    "#{self.id}-#{self.title} #{self.company_name}".to_slug.normalize.to_s
  end
  
  def social_link_url
    CGI::escape "http://jobs.ruby.tw/jobs/#{self.to_param}"
  end
  
  def social_link_title
    CGI::escape self.title
  end
  
  def social_link_content
    "#{social_link_title} #{social_link_url}"
  end
  
  def deadline_forever
    @deadline_forever ||= !self.deadline
  end

  def owned_by?(user)
    user && owner == user
  end
  
  def elapsed
    diff = Time.now - self.updated_at
    days  = (diff / 1.day).round
    hours = (diff / 1.hour).round
    mins  = (diff / 1.minute).round

    if days > 0
      elapsed_time = "#{days} day"
      elapsed_time += "s" unless days == 1
    elsif hours > 0
      elapsed_time = "#{hours} hour"
      elapsed_time += "s" unless hours == 1
    else
      elapsed_time = "#{mins} minute"
      elapsed_time += "s" unless mins == 1
    end
    elapsed_time
  end

  def elapsed_date
    diff = Time.now - self.updated_at
    days = (diff / 1.day).round
    days
  end

  def highlighted
    return highlighted1 | highlighted2
  end

  def total_price
    price = 250;
    price += 50 if highlighted1 == true
    price += 30 if highlighted2 == true
    return price
  end

  private
  
  def set_deadline
    self.deadline = nil if self.deadline_forever == "1"
  end
     
  def set_aasm_state
    self.aasm_state = "trial"
  end
  
end
