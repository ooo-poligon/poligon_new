class SitemapController < ApplicationController
  def show
    @additions       = Addition.all
    @articles        = Article.all
    @news_items      = NewsItem.all
    @categories      = Category.all
    @products        = Product.all
    @reviews         = Review.all
    @static_contents = StaticContent.all
    @videos          = Video.all
  end
end
