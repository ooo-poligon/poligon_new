class CategoriesController < ApplicationController
  
  def index
    @upLevelCategories = Category.where(parent: 1)
  end

  def show

  end
  
end
