# -*- encoding : utf-8 -*-
class ApplicationController < ActionController::Base
  #protect_from_forgery with: :exception

  before_action :current_cart
  before_filter :configure_permitted_parameters, if: :devise_controller?
  before_action :getCourse
  helper_method :verify_captcha, :get_prices_eur, :get_prices_rub, :hello_user, :parents_of, :set_meta, :generate_meta_from, :calculate_price

  def not_found
    raise ActionController::RoutingError.new('Not Found')
  rescue
    render_404
  end

  def render_404
    render file: "#{Rails.root}/public/404", status: :not_found
  end

  def verify_captcha(params)
    require 'uri'
    require 'net/http'

    secret_key    = '6LfXGoEUAAAAAImBtgFzKEWyqGtTv16WzTEc_WuV'
    request_body = {secret: secret_key, response: params[:'g-recaptcha-response'], remoteip: request.remote_ip }

    url = URI.parse('https://www.google.com/recaptcha/api/siteverify')
    req = Net::HTTP::Post.new(url.path)
    req.set_form_data(request_body)
    con = Net::HTTP.new(url.host, url.port)
    con.use_ssl = true

    res = con.start {|http| http.request(req)}
    res_array = JSON.parse(res.body)
    result = res_array['success']

    return result
  end

  def getCourse
    @courseEuro = ExchangeRate.last.eur_rate.to_f
    @courseUsd = ExchangeRate.last.usd_rate.to_f
    @fastDelivery = Setting.find_by(title: "fastDeliveryText")
    @deliveryInfo = Setting.find_by(title: "termsOfPayment")
    @phone1 = Setting.find_by(title: "phone1")
    @phone2 = Setting.find_by(title: "phone2")
  end
  
  def get_prices_eur(product)


    prices_array = []
    retail = product.base_price
    prices_array << retail 
    prices_array << product.special_price
    prices_array << product.price_10
    prices_array << product.opt_price
    prices_array << product.dealer_price
    prices_array << product.supplier_price
    prices_array << product.dealer_price2
    prices_array
  end

  def get_prices_rub(product)
    prices_array = []
    
    if product.currency_id == 2
      course_multiplier = 1
    else
      course_multiplier = (@courseEuro + (@courseEuro / 100) * 0.0)
    end

    retail_ru = product.base_price * course_multiplier
    supplier_ru = product.supplier_price * course_multiplier
    prices_array << retail_ru
    prices_array << product.special_price * course_multiplier
    prices_array << product.price_10 * course_multiplier
    prices_array << product.opt_price * course_multiplier
    prices_array << product.dealer_price * course_multiplier
    prices_array << supplier_ru
    prices_array << product.dealer_price2 * course_multiplier
    prices_array
  end

  def calculate_price(product, price = nil)

    currencyCourse = @courseEuro if product.currency_id == 1
    currencyCourse = @courseUsd if product.currency_id == 3

    course_multiplier = (currencyCourse + (currencyCourse / 100) * 0.0) unless product.currency_id == 2

    if price.nil?
      product_price = product.base_price
    else
      product_price = price
    end

    case product.currency_id
    when 1,3
      calculated_price = (product_price * course_multiplier).round(2)
    when 2
      calculated_price = product_price.round(2)
    end
    
    calculated_price
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
    if category_id.class == Fixnum
      element = Category.find(category_id)
    else
      element = Category.find(category_id.id)
    end
    while element.parent != 0
        parents_array.push(element)
        element = Category.find(element.parent)
    end
    parents_array
  end

  def _meta_tags_hash
    @_meta_tags_hash ||= {}
  end

  def set_meta(options)
    _meta_tags_hash.deep_merge!(normalize_meta_hash(options))
  end

  def generate_meta_from(input)
    set_meta  "title" => "poligon.info | " + input,
              "og:title" => input,
              "description" => ('Страница сайта "' + input + '"'),
              "og:description" => ('Страница сайта "' + input + '"'),
              "keywords" => get_keywords_from(input)
  end

  protected

  def normalize_meta_hash(hash)
    normalized = {}
    normalize_meta_hash_walker(hash, normalized)
    normalized
  end

  def normalize_meta_hash_walker(hash, normalized, current = nil)
    hash.each do |k, v|
      thisPath = current ? current.dup : []
      thisPath << k.to_s

      if v.is_a?(Hash)
        normalize_meta_hash_walker(v, normalized, thisPath)
      elsif v
        key = thisPath.join ":"
        normalized[:"#{key}"] = v
      end
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

  def get_keywords_from (source)
    forbidden_symbols = 
    output = []
    source.split(" ").each do |s|
      s.gsub!(/[^0-9a-zа-я ]/i, '')
      output << s.mb_chars.downcase if s.size > 3
    end
    output.join(", ")
  end

  private

  def current_cart
    ENV["http_proxy"] = ""
    @total_quantity = 0
    if session[:cart_id]
      cart = Cart.find_by(:id => session[:cart_id])
      if cart.present?
        @current_cart = cart
        line_items = LineItem.where(cart_id: @current_cart.id)
        # line_items.each do |item|
        #   @total_quantity += item.quantity
        # end
        @total_quantity = line_items.length
      else
        session[:cart_id] = nil
      end
    end

    if session[:cart_id] == nil
      @current_cart = Cart.create
      session[:cart_id] = @current_cart.id
    end
  end

  def find_or_make_cart
    @cart = (session[:cart] ||= Cart.new)
  end

end
