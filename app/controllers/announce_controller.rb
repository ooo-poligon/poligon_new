class AnnounceController < ApplicationController
  layout false

  def index
    @news_items = NewsItem.order(created_at: :desc)
  end
end
