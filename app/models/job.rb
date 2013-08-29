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
#  user_id           :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  aasm_state        :string(255)
#

class Job < ActiveRecord::Base
  
  attr_accessor :deadline_forever
  attr_accessible :title, :job_type, :tags, :occupation, :company_name, :company_logo, :url, :location, :description, :apply_information, :highlighted, :payment_method, :card_number, :ccvn, :expire_date, :zipcode

  extend Searchable
  searchable_by :title, :job_type, :tags, :company_name, :url, :location, :description, :apply_information
  
  validates_presence_of :title
  validates_presence_of :job_type
  validates_presence_of :company_name
  # validates_presence_of :occupation
  validates_presence_of :location
  validates_presence_of :description
  validates_presence_of :apply_information
  # validates_presence_of :owner
  
  # validates_format_of :description, :with => /(ruby|rails)/i, :message => "Doesn't seem to be a Ruby or Rails related job"
  TAGS = ['','Finance and Accounting',
'Graphics Designing',
'English Language',
'General Programming',
'Graphics Designing',
'Office Skills',
'Sales and Marketing',
'Translation Skills',
'Graphics Designing',
'International Languages',
'Translation Skills',
'Java Technologies',
'Operating Systems',
'English Language',
'Sales and Marketing',
'Web Designing',
'Sales and Marketing',
'English Language',
'General Programming',
'International Languages',
'Web Designing',
'Graphics Designing',
'General Programming',
'Web Designing',
'Internet Concepts',
'Operating Systems',
'Databases',
'Web Designing',
'General Programming',
'Finance and Accounting',
'Miscellaneous Certifications',
'Internet Programming',
'Electronics',
'Java Technologies',
'Web Designing',
'Networking',
'Internet Programming',
'Miscellaneous Certifications',
'Operating Systems',
'General Programming',
'Office Skills',
'Databases',
'Translation Skills',
'Databases',
'International Languages',
'Internet Concepts',
'International Languages',
'Translation Skills',
'Web Designing',
'Miscellaneous Certifications',
'English Language',
'Microsoft Technologies',
'General Programming',
'Sales and Marketing',
'General Management',
'Internet Programming',
'Java Technologies',
'General Programming',
'Graphics Designing',
'Sales and Marketing',
'Internet Programming',
'Operating Systems',
'Computer Skills',
'Networking',
'Operating Systems',
'Computer Skills',
'Graphics Designing',
'International Languages',
'Graphics Designing',
'Computer Skills',
'Translation Skills',
'Networking',
'Internet Programming',
'Computer Skills',
'General Management',
'International Languages',
'Databases',
'General Programming',
'Health and Fitness',
'Graphics Designing',
'Web Designing',
'English Language',
'Web Designing',
'Translation Skills',
'Web Designing',
'English Language',
'Computer Skills',
'Graphics Designing',
'Databases',
'Mobile Technologies',
'Web Designing',
'Finance and Accounting',
'Translation Skills',
'.Net Technology',
'Miscellaneous Certifications',
'English Language',
'Translation Skills',
'Internet Concepts',
'Web Designing']
  JOB_TYPE = ['', 'Full-time', 'Part-time', 'App Project']
  OCCUPATION = ['Web back-end', 'Web front-end', 'Web-design',
                'QA/Testing', 'Other']

  # validates_inclusion_of :job_type, :in => JOB_TYPE 
  # validates_inclusion_of :occupation, :in => OCCUPATION
  
  belongs_to :owner, :class_name => "User", :foreign_key => "user_id"

  before_validation :set_aasm_state, :on => :create
  before_validation :set_deadline
  
  scope :published , where(:aasm_state => "published")
  scope :online, published.where("deadline is NULL or deadline > ?", Date.today )
  scope :recent, :order => "id DESC"
  
  def open
    self.aasm_state = "published"
  end
  
  def close
    self.aasm_state = "closed"
  end
  
  def closed?
    self.aasm_state == "closed"
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
    diff = Time.now - self.created_at
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
    diff = Time.now - self.created_at
    days = (diff / 1.day).round
    days
  end

  private
  
  def set_deadline
    self.deadline = nil if self.deadline_forever == "1"
  end
     
  def set_aasm_state
    self.aasm_state = "published"
  end
  
end
