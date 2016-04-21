class SearchController < ApplicationController
  # для получения контента через http
  require 'open-uri'

  # подключаем Nokogiri
  require 'nokogiri'

  require 'active_support/core_ext/hash/conversions'

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

  before_action :getCourse

  def advanced_search
    @products = Sunspot.search(Product) do
      #fulltext search
      fulltext params['q'] do
        phrase_fields :title => 2.0
        phrase_slop   1
      end


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

    @analogs = Sunspot.search(Analog) do
      #fulltext search
      fulltext params['q'] do
        phrase_fields :title => 2.0
        phrase_fields :prototype => 2.0
        phrase_slop   1
      end


      #scoping
      if params.has_key?(:title)
        with :title, params['q']
      end

      paginate :page => params[:page], :per_page => 25
    end
    @analogs.execute!

    @addCBR = Setting.find_by title: 'AddCBR'

    query = params['q']
    farnell_api_key = FarnellKey.find(rand(1..2)).api_key

    farnell_request_uri =  "https://api.element14.com/catalog/products" +
                            "?callInfo.responseDataFormat=xml" +
                            "&callInfo.omitXmlSchema=false" +
                            "&term=any%3A" + query  +
                            "&storeInfo.id=ru.farnell.com" +
                            "&callInfo.apiKey=" + farnell_api_key +
                            "&resultsSettings.offset=0" +
                            "&resultsSettings.numberOfResults=10" +
                            "&resultsSettings.refinements.filters=rohsCompliant%2CinStock" +
                            "&resultsSettings.responseGroup=large"
    if farnell_request_uri.ascii_only?
      result = Nokogiri::XML(open(farnell_request_uri)) if farnell_request_uri.ascii_only?
      @farnell_products = Hash.from_xml(result.to_s)["keywordSearchReturn"]["products"]
    else
      render "advanced_search"
    end
  end

private

end
