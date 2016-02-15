# -*- encoding : utf-8 -*-
class ProductsController < ApplicationController
  # GET /products/1
  # GET /products/1.json

  before_action :getCourse

  def show
    @product = Product.find(params[:id])
    addCBR = Setting.find_by title: 'AddCBR'
    @retail_price = (@product.price * (@courseEuro + (@courseEuro / 100) * addCBR.text_value.to_f) * @product.rate).round
    @productImage = ImageFile.where("owner_id = ? and file_type_id = 1", @product.id).first
    productFunctions = ProductFunction.where("product_id = ?", @product.id)
    function_ids = []
    productFunctions.each do |pf|
      function_ids.push(pf.function_id)
    end
    @functions = []
    function_ids.each do |id|
      @functions.push(Function.find(id))
    end
    @productKind = ProductKind.find(@product.product_kind_id)
    propertyTypes = KindsType.where("product_kind_id = ?", @productKind.id)
    propertyTypeIds = []
    propertyTypes.each do |pt|
      propertyTypeIds.push(pt.property_type_id)
    end
    @propertyTypesOfProduct = []
    propertyTypeIds.each do |id|
      @propertyTypesOfProduct.push(PropertyType.find(id))
    end
    @properties = []
    @propertyTypesOfProduct.each do |ptp|
      array = []
      array.push(ptp.id)
      array.push(Property.where("property_type_id = ?", ptp.id))
      @properties.push(array)
    end


  end




  protected

  def getCourse
    require 'net/http'
    url = URI.parse('http://www.poligon.info/upload/course.euro')
    req = Net::HTTP::Get.new(url.to_s)
    res = Net::HTTP.start(url.host, url.port) {|http|
      http.request(req)
    }
    @courseEuro = res.body.to_s.to_f




    #course_array = []
    #File.open('http://www.poligon.info/upload/course.euro', 'r') {|f| course_array.push(f.readline) }
    #@courseEuro = course_array[0]
    #if (course_array[0].to_s == Time.now.strftime("%d/%m/%Y").to_s)
      #
    #else
      #parse_cbr
    #end
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
