# config/initializers/recaptcha.rb
Recaptcha.configure do |config|
  config.site_key  = '6LfXGoEUAAAAAL65Rh4FFIu_vk2wP-l0reiOMiUL'
  config.secret_key = '6LfXGoEUAAAAAImBtgFzKEWyqGtTv16WzTEc_WuV'
  # Uncomment the following line if you are using a proxy server:
  # config.proxy = 'http://myproxy.com.au:8080'
end
