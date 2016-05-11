# -*- encoding : utf-8 -*-
class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :configure_permitted_parameters, if: :devise_controller?

  helper_method :get_prices_eur, :get_prices_rub, :hello_user

  def get_prices_eur(product)
    prices_array = []
    retail = product.price * product.rate
    prices_array << retail.round
    prices_array << retail - (retail/100 * product.special)
    prices_array << retail - (retail/100 * product.discount1)
    prices_array << retail - (retail/100 * product.discount2)
    prices_array << retail - (retail/100 * product.discount3)
    prices_array << product.price
    prices_array
  end

  def get_prices_rub(product)
    prices_array = []
    course_multiplier = (@courseEuro + (@courseEuro / 100) * @addCBR.text_value.to_f)
    retail_ru = product.price * product.rate * course_multiplier
    prices_array << retail_ru
    prices_array << retail_ru - (retail_ru/100 * product.special)
    prices_array << retail_ru - (retail_ru/100 * product.discount1)
    prices_array << retail_ru - (retail_ru/100 * product.discount2)
    prices_array << retail_ru - (retail_ru/100 * product.discount3)
    prices_array << product.price * course_multiplier
    prices_array
  end

  def hello_user
    io_only = []
    current_user.name.split(" ").each_with_index do |word, idx|
      io_only.push word if idx != 0
    end
    "Здравствуйте, #{ io_only.join(" ") }!"
  end

  protected

  def configure_permitted_parameters
     devise_parameter_sanitizer.for(:sign_in) { |u| u.permit(:name, :email, :group_id, :subscribe) }
     devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:name, :email, :password, :password_confirmation, :group_id, :subscribe) }
     devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:name, :email, :password, :password_confirmation, :current_password, :group_id, :subscribe) }
  end

  def getCourse
    require 'net/http'
    url = URI.parse('http://www.poligon.info/upload/course.euro')
    req = Net::HTTP::Get.new(url.to_s)
    res = Net::HTTP.start(url.host, url.port) {|http|
      http.request(req)
    }
    @courseEuro = res.body.to_s.to_f
  end

  def parse_cbr
    require 'net/http'
    url = URI.parse('http://cbr.ru/scripts/XML_daily.asp?date_req=' + Time.now.strftime("%d/%m/%Y"))
    req = Net::HTTP::Get.new(url.to_s)
    res = Net::HTTP.start(url.host, url.port) {|http|
      http.request(req)
    }
    course = ''
    array = (Nokogiri::XML(res.body).xpath("//Valute"))
    array.each do |c|
      if c.to_s.encode("UTF-8").include?("EUR")
        course = c.to_s.encode("UTF-8").gsub("\r\n", "\n").gsub(",", ".")[120..126]
      end
    end

    to_file = [course.to_f, Time.now.strftime("%d/%m/%Y")]

    File.open('current_course_euro', 'w') {|f| f.write(to_file[1] + "\n" + to_file[0].to_s) }
    @courseEuro = course.to_f
  end

end
