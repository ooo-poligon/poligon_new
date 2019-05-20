class Admin::SearchKeywordsController < Admin::BaseController

  def index
    @key = SearchKeyword.new
    @keys = SearchKeyword.all
  end

  def create
    params[:search_keyword][:title].split("*").reject { |c| c.empty? }.each do |key|
      key_text = key.squish
      new_key = SearchKeyword.new(title: key_text)
      new_key.save
    end
    redirect_to admin_search_keywords_path
  end

  def destroy
    @key = SearchKeyword.find params[:id]
    if @key.delete
      redirect_to admin_search_keywords_path
    end
  end
end