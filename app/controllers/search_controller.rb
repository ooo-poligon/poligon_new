class SearchController < ApplicationController
  # для получения контента через http
  require 'open-uri'

  # подключаем Nokogiri
  require 'nokogiri'

  require 'active_support/core_ext/hash/conversions'

  helper_method :copy_to_clipboard

  def copy_to_clipboard product_id, currency
    product = Product.find(product_id)
    quantity = Quantity.find_by( product_id: product_id )
    result_quantity = 0
    result_quantity = quantity.stock - quantity.reserved  if !quantity.nil?
    if currency == 'eur'
      price = get_prices_eur(product)[0].round(2)
      if result_quantity > 0
        clipboard_value =
          "#{ product.title } — Цена: #{ price } евро c НДС. Количество: #{ result_quantity } шт."
      else
        clipboard_value =
          "#{ product.title } — Цена: #{ price } евро c НДС. Срок поставки: 3-4 недели"
      end
    elsif currency == 'rub'
      price = get_prices_rub(product)[0].round(2)
      if result_quantity > 0
        clipboard_value =
          "#{ product.title } — Цена: #{ price } рублей c НДС. Количество: #{ result_quantity } шт."
      else
        clipboard_value =
          "#{ product.title } — Цена: #{ price } рублей c НДС. Срок поставки: 3-4 недели"
      end
    end
    Clipboard.copy clipboard_value
  end

  def search
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
      paginate :page => params[:products_page], :per_page => 10
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

      paginate :page => params[:articles_page], :per_page => 25
    end
    @articles.execute!

    @additions = Sunspot.search(Addition) do
      #fulltext search
      fulltext params['q']

      #scoping
      if params.has_key?(:title)
        with :title, params['q']
      end
      if params.has_key?(:content)
        with :content, params['q']
      end

      paginate :page => params[:additions_page], :per_page => 25
    end
    @additions.execute!

    @reviews = Sunspot.search(Review) do
      #fulltext search
      fulltext params['q']

      #scoping
      if params.has_key?(:title)
        with :title, params['q']
      end
      if params.has_key?(:content)
        with :content, params['q']
      end

      paginate :page => params[:reviews_page], :per_page => 25
    end
    @reviews.execute!

    @videos = Sunspot.search(Video) do
      #fulltext search
      fulltext params['q']

      #scoping
      if params.has_key?(:title)
        with :title, params['q']
      end
      if params.has_key?(:content)
        with :content, params['q']
      end

      paginate :page => params[:videos_page], :per_page => 25
    end
    @videos.execute!

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

      paginate :page => params[:news_items_page], :per_page => 25
    end
    @news_items.execute!

    @categories = Sunspot.search(Category) do
      #fulltext search
      fulltext params['q']

      #scoping
      if params.has_key?(:title)
        with :title, params['q']
      end
      if params.has_key?(:description)
        with :description, params['q']
      end

      paginate :page => params[:categories_page], :per_page => 25
    end
    @categories.execute!

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

      paginate :page => params[:static_contents_page], :per_page => 25
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
      paginate :page => params[:products_page], :per_page => 10
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

      paginate :page => params[:analogs_page], :per_page => 25
    end
    @analogs.execute!

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

      paginate :page => params[:articles_page], :per_page => 25
    end
    @articles.execute!

    @additions = Sunspot.search(Addition) do
      #fulltext search
      fulltext params['q']

      #scoping
      if params.has_key?(:title)
        with :title, params['q']
      end
      if params.has_key?(:content)
        with :content, params['q']
      end

      paginate :page => params[:additions_page], :per_page => 25
    end
    @additions.execute!

    @reviews = Sunspot.search(Review) do
      #fulltext search
      fulltext params['q']

      #scoping
      if params.has_key?(:title)
        with :title, params['q']
      end
      if params.has_key?(:content)
        with :content, params['q']
      end

      paginate :page => params[:reviews_page], :per_page => 25
    end
    @reviews.execute!

    @videos = Sunspot.search(Video) do
      #fulltext search
      fulltext params['q']

      #scoping
      if params.has_key?(:title)
        with :title, params['q']
      end
      if params.has_key?(:content)
        with :content, params['q']
      end

      paginate :page => params[:videos_page], :per_page => 25
    end
    @videos.execute!

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

      paginate :page => params[:news_items_page], :per_page => 25
    end
    @news_items.execute!

    @categories = Sunspot.search(Category) do
      #fulltext search
      fulltext params['q']

      #scoping
      if params.has_key?(:title)
        with :title, params['q']
      end
      if params.has_key?(:description)
        with :description, params['q']
      end

      paginate :page => params[:categories_page], :per_page => 25
    end
    @categories.execute!

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

      paginate :page => params[:static_contents_page], :per_page => 25
    end
    @static_contents.execute!

    @addCBR = Setting.find_by title: 'AddCBR'
    @farnell_products = farnell_search params['q']
    #@farnell_products = @farnell_products.paginate(:page => params[:farnell_page], :per_page => 10) if @farnell_products.is_a? Array
  end

private

  def number_or_nil string
    Integer(string || '')
  rescue ArgumentError
    nil
  end

  def farnell_search query
    farnell_products = []
    @query = query
    @results_number =  10
    farnell_params = (params['farnell_page'].to_i - 1)
    @results_offset = (farnell_params * @results_number)
    farnell_api_key = FarnellKey.find(rand(1..2)).api_key
    farnell_request_uri = "https://api.element14.com/catalog/products" +
                          "?callInfo.responseDataFormat=xml" +
                          "&callInfo.omitXmlSchema=false" +
                          "&term=any%3A" + @query  +
                          "&storeInfo.id=ru.farnell.com" +
                          "&callInfo.apiKey=" + farnell_api_key +
                          "&resultsSettings.offset=" + @results_offset.to_s +
                          "&resultsSettings.numberOfResults=" + @results_number.to_s +
                          "&resultsSettings.responseGroup=large"
    if farnell_request_uri.ascii_only?
      @summary = number_or_nil Nokogiri::XML(
                 open(farnell_request_uri)).xpath("//ns1:keywordSearchReturn//ns1:numberOfResults").text
      result = Nokogiri::XML(open(farnell_request_uri))
      result_products = Hash.from_xml(result.to_s)["keywordSearchReturn"]["products"]
      @rp = open(farnell_request_uri).read
      if result_products.is_a? Array
        result_products.each do |prod|
          farnell_products.push prod
        end
      else
        farnell_products.push result_products
      end
    else
      render "advanced_search"
    end
    farnell_products
  end
end
