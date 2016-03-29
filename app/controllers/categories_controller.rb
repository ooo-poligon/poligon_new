class CategoriesController < ApplicationController

  def index
    @upLevelCategories = Category.where(parent: 1)
  end

  before_action :getCourse

  def show
    @allUpLevelCategories = []
    @allUpLevelCategoriesIds = []
    Category.where(parent: 0).each do |c0|
      @allUpLevelCategories.push(c0)
    end
    @allUpLevelCategories.each do |category|
      @allUpLevelCategoriesIds.push(category.id)
    end
    @subCategories = Category.where(parent: params[:id])
    @recentCategory = Category.find(params[:id])
    @parentCategory = Category.find(@recentCategory.parent)
    @products = []
    addCBR = Setting.find_by title: 'AddCBR'

    Product.available.where(category_id: params[:id]).each do |product|
      minihash = []
      minihash.push(product, (product.price * (@courseEuro + (@courseEuro / 100) * addCBR.text_value.to_f) * product.rate).round)
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
