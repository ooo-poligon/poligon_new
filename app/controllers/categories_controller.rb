class CategoriesController < ApplicationController

  def index
    @upLevelCategories = Category.available.where(parent: 1)
    @addCBR = Setting.find_by title: 'addCBR'
  end

  before_action :getCourse

  def show
    @curCatSlug = params[:id]
    @currentCategoryId = Category.friendly.find(@curCatSlug).id
    @addCBR = Setting.find_by title: 'addCBR'
    @allUpLevelCategories = []
    @allUpLevelCategoriesIds = []
    Category.available.where(parent: 0).each do |c0|
      @allUpLevelCategories.push(c0)
    end
    @allUpLevelCategories.each do |category|
      @allUpLevelCategoriesIds.push(category.id)
    end
    
    @subCategories  = Category.available.where(parent: @currentCategoryId)
    @recentCategory = Category.available.find(@currentCategoryId)
    @parentCategory = Category.available.find(@recentCategory.parent)
    @preCategories  = Category.available.where(parent: @parentCategory.id)

    @parents_array  = parents_of @recentCategory
    @parents_categories_ids = []
    @parents_array.each do |parent|
      @parents_categories_ids.push parent.id
    end

    recentAndSubCategoriesIds = []
    recentAndSubCategoriesIds.push @currentCategoryId
    
    @subCategories.each do |sc|
      recentAndSubCategoriesIds.push sc.id
    end

    @vendors_categories_ids = [142, 74, 5094, 5414, 5535, 5818, 77, 6321, 5583, 5512, 5650, 6371]

    @products = []
    Product.available
            .where(category_id: recentAndSubCategoriesIds)
            .order('sorting DESC')
            .order('stock DESC')
            .includes(:vendor).each do |product|
      one_product_array = []
      product_price = calculate_price(product)
      quantity = product.stock
      if quantity > 0 || (quantity == 0 && recentAndSubCategoriesIds.length == 1)
        one_product_array.push(product, product_price, quantity, product.vendor)
        @products.push(one_product_array)
      end
    end

    @products = @products.paginate(:page => params[:page], :per_page => 10)
  end

  def quantity_cash
    quantity_cash = params[:quantity]
    respond_to do |format|
      format.json {render json: {quantity: quantity_cash}}
    end
  end
end
