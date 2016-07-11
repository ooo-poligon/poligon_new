class SitemapController < ApplicationController
  def show
    sitemap_content
  end

  def sitemap
    sitemap_content
  end

  private

  def sitemap_content
    @additions       = Addition.all
    @articles        = Article.all
    @news_items      = NewsItem.all
    @categories      = Category.available.where.not(id: 1..4)
    @products        = Product.available
    @reviews         = Review.all
    @static_contents = StaticContent.all
    @videos          = Video.all
  end
end
