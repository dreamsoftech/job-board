source 'https://rubygems.org'
ruby "1.9.3"

gem 'rails', '~> 3.2.12'

group :assets do
  gem 'sass-rails',   '~> 3.2.3'
  gem 'coffee-rails', '~> 3.2.1'

  # See https://github.com/sstephenson/execjs#readme for more supported runtimes
  gem 'therubyracer', :platforms => :ruby

  gem 'uglifier', '>= 1.0.3'
end

# Bundle edge Rails instead:
# gem 'rails', :git => 'git://github.com/rails/rails.git'

gem 'jquery-rails'
gem 'font-awesome-sass-rails'
gem "bootstrap-sass", ">= 2.3.0.0"
gem 'devise', '~>2.1.3'
gem 'mysql2'
gem 'simple_form'

gem "paperclip", "~> 3.0"
gem "paperclip-dropbox"

gem "stripe", ">= 1.7.11"
gem "stripe_event", ">= 0.4.0"
gem "figaro"

gem "babosa"
gem "rails_autolink"

gem "settingslogic"
gem "seo_helper"
gem 'open_graph_helper'
gem 'google_plus_helper'

gem 'exception_notification'

gem "mobile-fu"

gem 'capistrano', :group => "development"

gem 'rake', :group => :test

group :development do
  gem "capistrano"
  gem "magic_encoding"
  gem "annotate"
  gem "sqlite3"
end

group :test, :development do
  gem "rspec"
  gem "rspec-rails"
  gem "simplecov"
  gem "capybara"
end

group :production do
  gem 'thin'
  gem 'pg'
end