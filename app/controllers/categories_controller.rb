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
      one_product_array = []
      if product.currency_id == 1
        if !Quantity.find_by(product_id: product.id).nil? && Quantity.find_by(product_id: product.id).stock > 0
          one_product_array.push(product, (product.price * (@courseEuro + (@courseEuro / 100) * addCBR.text_value.to_f) * product.rate).round(2), 1)
        else
          one_product_array.push(product, (product.price * (@courseEuro + (@courseEuro / 100) * addCBR.text_value.to_f) * product.rate).round(2), 0)
        end
      elsif product.currency_id == 2
        if !Quantity.find_by(product_id: product.id).nil? && Quantity.find_by(product_id: product.id).stock > 0
          one_product_array.push(product, product.rub_retail.round(2), 1)
        else
          one_product_array.push(product, product.rub_retail.round(2), 0)
        end
      end
      @products.push(one_product_array)
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
  end

end
