class NewsItemsController < ApplicationController
  # GET /news_items
  # GET /news_items.json
  def index
    @news_items = NewsItem.all.order("created_at DESC")

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @news_items }
    end
  end

  # GET /news_items/1
  # GET /news_items/1.json
  def show
    @news_item = NewsItem.friendly.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @news_item }
    end
  end
end
