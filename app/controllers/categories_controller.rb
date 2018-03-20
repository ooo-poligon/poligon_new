class CategoriesController < ApplicationController

  def index
    @upLevelCategories = Category.available.where(parent: 1)
    @addCBR = Setting.find_by title: 'addCBR'
  end

  before_action :getCourse

  def show
    @addCBR = Setting.find_by title: 'addCBR'
    @allUpLevelCategories = []
    @allUpLevelCategoriesIds = []
    Category.available.where(parent: 0).each do |c0|
      @allUpLevelCategories.push(c0)
    end
    @allUpLevelCategories.each do |category|
      @allUpLevelCategoriesIds.push(category.id)
    end
    @subCategories  = Category.available.where(parent: params[:id])
    @recentCategory = Category.available.find(params[:id])
    @parentCategory = Category.available.find(@recentCategory.parent)
    @parents_array  = parents_of @recentCategory
    @parents_categories_ids = []
    @parents_array.each do |parent|
      @parents_categories_ids.push parent.id
    end
    @vendors_categories_ids = [142, 5094, 74, 5414, 5535, 5818, 5933, 5583, 5512, 6441, 4847, 6321, 5650]
    @products = []
    addCBR = Setting.find_by title: 'addCBR'
    Product.available.where(category_id: params[:id]).each do |product|
      vendor = Vendor.find(product.vendor_id)
      one_product_array = []
      product_price = 0
      if product.currency_id == 1
        product_price = (product.price * (@courseEuro + (@courseEuro / 100) * addCBR.text_value.to_f) * product.rate).round(2)
      elsif product.currency_id == 2
        product_price = product.rub_retail.round(2)
      end
      quantity = !Quantity.find_by(product_id: product.id).nil? && Quantity.find_by(product_id: product.id).stock > 0 ? Quantity.find_by(product_id: product.id).stock : 0
      one_product_array.push(product, product_price, quantity, vendor)
      @products.push(one_product_array)
    end

  end

end
