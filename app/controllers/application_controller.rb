# -*- encoding : utf-8 -*-
class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :configure_permitted_parameters, if: :devise_controller?
  before_filter :getCourse

  helper_method :get_prices_eur, :get_prices_rub, :hello_user, :parents_of, :rub_case_with_kopeiki

  def get_prices_eur(product)
    prices_array = []
    retail = product.price * product.rate
    prices_array << retail
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
    retail_ru = product.rub_retail if product.currency_id == 2
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

  def parents_of(category_id)
    parents_array = []
    element = Category.find(category_id)
    while element.parent != 0
        parents_array.push(element)
        element = Category.find(element.parent)
    end
    parents_array
  end

  def rub_case_with_kopeiki decimal_number
    dec_part = (decimal_number%1).round(2)
    rub_part = (decimal_number - (decimal_number%1)).to_i
    kop_part = (dec_part * 100).to_i
    rub_case = cases rub_part, 'рубль'
    kop_case = cases kop_part, 'копейка'
    unless kop_part == 0
      html_output = "<p><b style=\"font-size: 16px; font-size: 0.8vw; color: blue; font-weight: bolder;\">" +
                    "Цена: #{rub_part} #{rub_case} #{kop_part} #{kop_case}.</b></p>"
    else
      html_output = "<p><b style=\"font-size: 16px; font-size: 0.8vw; color: blue; font-weight: bolder;\">" +
                    "Цена: #{rub_part} #{rub_case}.</b></p>"
    end
    html_output.html_safe
  end

  protected

  def cases (number, kind)
    if kind == 'рубль'
      if (number%100 == 11) || (number%100 == 12) || (number%100 == 13) || (number%100 == 14)
        'рублей'
      elsif (number%10 == 1)
        'рубль'
      elsif (number%10 == 2) || (number%10 == 3) || (number%10 == 4)
        'рубля'
      else
        'рублей'
      end
    elsif kind == 'копейка'
      if (number == 11) || (number == 12) || (number == 13) || (number == 14)
        'копеек'
      elsif (number%10 == 1)
        'копейка'
      elsif (number%10 == 2) || (number%10 == 3) || (number%10 == 4)
        'копейки'
      else
        'копеек'
      end
    else
      ''
    end
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_in) do |user|
      user.permit(:name, :email, :group_id, :subscribe)
    end
    devise_parameter_sanitizer.permit(:sign_up) do |user|
      user.permit(:name, :email, :password, :password_confirmation, :group_id, :subscribe)
    end
    devise_parameter_sanitizer.permit(:account_update) do |user|
      user.permit(:name, :email, :password, :password_confirmation, :current_password, :group_id, :subscribe)
    end
  end

  def getCourse
    @addCBR = Setting.find_by title: 'addCBR'
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
