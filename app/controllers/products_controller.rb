# -*- encoding : utf-8 -*-
class ProductsController < ApplicationController

  before_action :getCourse

  def show
    @product = Product.find(params[:id])
    @parents_array = parents_of(@product.category_id)
    @addCBR = Setting.find_by title: 'addCBR'
    if @product.currency_id == 1
      @retail_price = (@product.price * (@courseEuro + (@courseEuro / 100) * @addCBR.text_value.to_f) * @product.rate).round(2)
    elsif @product.currency_id == 2
      @retail_price = @product.rub_retail.round(2)
    end
    @productImage = ImageFile.where("owner_id = ? and file_type_id = 1", @product.id).first
    @productPdf   = ImageFile.where("owner_id = ? and file_type_id = 2", @product.id).first
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
end
