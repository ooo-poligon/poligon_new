class AuthController < ApplicationController
  def verify_captcha(params)
     require 'uri'
     require 'net/http'

     uri = URI("https://www.google.com/recaptcha/api/siteverify")
     https = Net::HTTP.new(uri.host, uri.port)
     https.use_ssl = true
     verify_request = Net::HTTP::Post.new(uri.path)
     verify_request["secret"]    = '6LfXGoEUAAAAAImBtgFzKEWyqGtTv16WzTEc_WuV'
     verify_request["remoteip"]  = request.remote_ip 
     verify_request["response"]  = params[:'g-recaptcha-response'] 

     response = https.request(verify_request)    
     render json: {success: true, response: response.body}, status: 200
     return 
   end
end