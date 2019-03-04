# -*- encoding : utf-8 -*-
class ProductsController < ApplicationController
  before_action :getCourse

  def show
    @product                   = Product.friendly.find(params[:id])
    if @product.available == 0 && current_user.nil?
      return not_found
    end
    @parents_array             = parents_of(@product.category_id)
    @addCBR                    = Setting.find_by title: 'addCBR'
    
    if @product.special_price > 0
      @retail_price = calculate_price(@product, @product.special_price)
    else
      @retail_price = calculate_price(@product, @product.base_price)
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

    #@product_properties = Property.where(product_kind_id: @productKind).pluck(:id)
    #values = PropertyValue.where(product_id:  @product.id).includes(:properties).where(property_id: @product_properties)


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

    @products_list = Product.available.includes(:vendor).where.not(stock: 0).order('sorting DESC')

    if params[:vendor]
      vendor = Vendor.find_by(title: params[:vendor])
      @products_list = @products_list.where(vendor_id: vendor&.id)
    end

    @products_list.each do |product|
      vendor = Vendor.find(product.vendor_id)
      
      one_product_array = []
      product_price = calculate_price(product)
      
      quantity = product.stock
      #
      one_product_array.push(product, product_price, quantity, vendor)
      @products.push(one_product_array)
      #
    end

    respond_to do |format|
      format.html { @products = @products.paginate(:page => params[:page], :per_page => 10) }
      format.xlsx { render xlsx: "POLIGON.INFO_STOCK_#{Date.today.strftime("%d-%m-%y")}",
                    template: "shared/xls",
                    locals: { workbook_name: "Товары на складе" }
                  }
    end
  end

  def autocomplete_product_title
    term = params[:term] || nil
    @products = []
    @products = Product.where('title LIKE ?', "%#{term}%").limit(50) if term
    render json: @products
  end

end
