class CategoriesController < ApplicationController

  def index
    @upLevelCategories = Category.available.where(parent: 1)

  end

  before_action :getCourse

  def show
    @allUpLevelCategories = []
    @allUpLevelCategoriesIds = []
    Category.available.where(parent: 0).each do |c0|
      @allUpLevelCategories.push(c0)
    end
    @allUpLevelCategories.each do |category|
      @allUpLevelCategoriesIds.push(category.id)
    end
    @subCategories = Category.available.where(parent: params[:id])
    @recentCategory = Category.available.find(params[:id])
    @parentCategory = Category.available.find(@recentCategory.parent)
    @products = []
    addCBR = Setting.find_by title: 'AddCBR'

    Product.available.where(category_id: params[:id]).each do |product|
      minihash = []
      if product.currency_id == 1
        minihash.push(product, (product.price * (@courseEuro + (@courseEuro / 100) * addCBR.text_value.to_f) * product.rate).round)
      elsif product.currency_id == 2
        minihash.push(product, product.rub_retail.round)
      end
      @products.push(minihash)
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
