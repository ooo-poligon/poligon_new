source 'http://rubygems.org' # was https in original

gem 'rails', '4.2.5'
gem 'i18n'
gem 'mysql2'
gem 'bootstrap-sass', '~> 3.3.5'
gem 'sass-rails', '>= 3.2'
gem 'autoprefixer-rails'
gem 'protected_attributes'
gem 'tzinfo-data'
gem 'sunspot_rails', '2.2.4'
gem 'sunspot_solr', '2.2.4'
gem 'will_paginate', '~> 3.0.5'
gem 'progress_bar'
gem 'fancybox-rails'
gem 'therubyracer', :platform => :ruby
gem 'jquery-rails'
gem 'jquery-turbolinks'
gem 'nokogiri'
gem 'devise'
gem 'devise-i18n'
gem 'gibbon', git: 'git://github.com/amro/gibbon.git'
gem 'sucker_punch', '~> 1.0'
gem 'mandrill-api'
gem 'figaro'
gem 'rack-mini-profiler', require: false
gem 'zeroclipboard-rails'
gem 'turbolinks'
gem 'zipline'
gem 'whenever', require: false
gem 'rusprice', '~> 1.1'

group :assets do
  gem 'coffee-rails'
  gem 'uglifier', '>= 1.0.3'
end

group :test do
  gem 'capybara'
  gem 'selenium-webdriver'
  gem 'headless'
  gem 'email_spec'
  gem 'launchy'
end

group :development, :test do
  gem 'rspec-rails', '~> 3.4'
  gem 'cucumber-rails', :require => false
  gem 'database_cleaner'
  gem 'shoulda-matchers'
  gem 'factory_girl_rails'
  gem 'faker', github: 'stympy/faker'
  gem 'spring'
  gem 'spring-commands-rspec'
  gem 'spring-commands-cucumber'
  gem 'guard'
  gem 'guard-spring'
  gem 'guard-rspec'
  gem 'guard-cucumber'
end

group :development do
  gem 'mina', '0.3.8'
  gem 'puma', '= 3.11.2'
end

group :production do
  gem 'exception_notification'
end

# Added at 2018-03-09 00:03:34 +0300 by igor:
gem "byebug", "~> 10.0", :groups => [:development, :test]
