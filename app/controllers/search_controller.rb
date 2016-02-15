class SearchController < ApplicationController
  def search
    @products = Sunspot.search(Product) do
      #fulltext search
      fulltext params['q']

      #scoping
      if params.has_key?(:title)
        with :title, params['q']
      end
      if params.has_key?(:description)
        with :description, params['q']
      end

      paginate :page => params[:page], :per_page => 25
    end
    @products.execute!

    @articles = Sunspot.search(Article) do
      #fulltext search
      fulltext params['q']

      #scoping
      if params.has_key?(:title)
        with :title, params['q']
      end
      if params.has_key?(:content)
        with :content, params['q']
      end

      paginate :page => params[:page], :per_page => 25
    end
    @articles.execute!

    @news_items = Sunspot.search(NewsItem) do
      #fulltext search
      fulltext params['q']

      #scoping
      if params.has_key?(:title)
        with :title, params['q']
      end
      if params.has_key?(:content)
        with :content, params['q']
      end

      paginate :page => params[:page], :per_page => 25
    end
    @news_items.execute!

    @static_contents = Sunspot.search(StaticContent) do
      #fulltext search
      fulltext params['q']

      #scoping
      if params.has_key?(:title)
        with :title, params['q']
      end
      if params.has_key?(:content)
        with :content, params['q']
      end

      paginate :page => params[:page], :per_page => 25
    end
    @static_contents.execute!

    render action: "search"
  end
end
