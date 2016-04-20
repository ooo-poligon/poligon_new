# -*- encoding : utf-8 -*-
class ProductsController < ApplicationController

  before_action :getCourse

  def show
    @product = Product.find(params[:id])
    @addCBR = Setting.find_by title: 'AddCBR'
    @retail_price = (@product.price * (@courseEuro + (@courseEuro / 100) * @addCBR.text_value.to_f) * @product.rate).round
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
end
