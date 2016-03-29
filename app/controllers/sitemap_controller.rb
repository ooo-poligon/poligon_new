class SitemapController < ApplicationController
  def show
    @additions       = Addition.all
    @articles        = Article.all
    @news_items      = NewsItem.all
    @categories      = Category.where.not(id: 1..4)
                               .where.not(parent: 2..4)
    @products        = Product.available
    @reviews         = Review.all
    @static_contents = StaticContent.all
    @videos          = Video.all
  end
end
