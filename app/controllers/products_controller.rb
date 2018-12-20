# -*- encoding : utf-8 -*-
class ProductsController < ApplicationController

  before_action :getCourse

  def show

    @product                   = Product.find(params[:id])
    @parents_array             = parents_of(@product.category_id)
    @addCBR                    = Setting.find_by title: 'addCBR'
     

    if @product.currency_id    == 1
      course_multiplier        = (@courseEuro + (@courseEuro / 100) * @addCBR.text_value.to_f)
      @retail_price            = @product.base_price * course_multiplier
    elsif @product.currency_id == 2
      @retail_price            = @product.base_price
    end

    
    
    productFunctions           = ProductFunction.where("product_id = ?", @product.id)
    function_ids               = []
    productFunctions.each do |pf|
      function_ids.push pf.function_id
    end

    @functions                 = []
    function_ids.each do |id|
      @functions.push Function.find(id)
    end

    @productKind = ProductKind.find(@product.product_kind_id)
    @propHash = {}
    @all_product_kind_properties = Property.where(product_kind_id: @productKind)
    @all_product_kind_properties.each do |property|
      value_for_product = PropertyValue.find_by(
                                                property_id: property.id,
                                                product_id:  @product.id
                                              )
      unless value_for_product.nil?
        @propHash[property] = [value_for_product.value, property.order_number]
      end
    end
    propArray = []
    @propHash.each do |key ,value|
      propArray.push [value[1], key, value[0]]
    end
    @sortedArray = propArray.sort {|a,b| a[0] <=> b[0]}
=begin
    # находим все виды свойств, присущих этому типу устройств
    @propertyTypesOfProduct_unordered = []
    (@productKind.property_types).each do |type|
      array = []
      case type.title
      when "Функционал"
        array.push 1
        array.push type
        @propertyTypesOfProduct_unordered.push array
      when "Задержки времени"
        array.push 2
        array.push type
        @propertyTypesOfProduct_unordered.push array
      when "Электротехнические параметры"
        array.push 3
        array.push type
        @propertyTypesOfProduct_unordered.push array
      when "Условия эксплуатации"
        array.push 4
        array.push type
        @propertyTypesOfProduct_unordered.push array
      when "Механическое исполнение"
        array.push 5
        array.push type
        @propertyTypesOfProduct_unordered.push array
      when "Физические параметры"
        array.push 6
        array.push type
        @propertyTypesOfProduct_unordered.push array
      when "Происхождение"
        array.push 7
        array.push type
        @propertyTypesOfProduct_unordered.push array
      end
    end

    @propertyTypesOfProduct = @propertyTypesOfProduct_unordered.sort do |a, b|
      a[0] <=> b[0]
    end

    @properties = []
    @propertyTypesOfProduct.each do |ptp|
      array = []
      array.push(ptp[1].id)
      array.push(Property.where("property_type_id = ?", ptp[1].id))
      @properties.push array
    end
=end
  end


  def stock
    @products = []
    addCBR = Setting.find_by title: 'addCBR'

    Product.available.where.not(stock: 0).each do |product|
      vendor = Vendor.find(product.vendor_id)
      
      one_product_array = []
      product_price = 0

      if product.currency_id == 1
        product_price = (product.base_price * (@courseEuro + (@courseEuro / 100) * addCBR.text_value.to_f)).round(2)
      elsif product.currency_id == 2
        product_price = product.base_price.round(2)
      end
      
      quantity = product.stock
      #
      one_product_array.push(product, product_price, quantity, vendor)
      @products.push(one_product_array)
      #
    end

    @products = @products.paginate(:page => params[:page], :per_page => 10)
  end

end
