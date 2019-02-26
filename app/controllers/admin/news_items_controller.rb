class Admin::NewsItemsController < Admin::BaseController

  def index
    @news_items = NewsItem.all
  end

  def new
    @news_item = NewsItem.new
  end

  def edit
    @news_item = NewsItem.find params[:id]
  end

  def create
    @news_item = NewsItem.new news_item_params
    if @news_item.save
      flash[:success] = "Новость создана"
      redirect_to admin_news_items_path
    else
      flash[:success] = "Ошибка создания"
      redirect_to admin_news_items_path
    end
  end

  def destroy
    @news_item = NewsItem.find params[:id]
    if @news_item.destroy
      flash[:success] = "Новость удалена"
      redirect_to admin_news_items_path
    else
      flash[:success] = "Ошибка удаления"
      redirect_to admin_news_items_path
    end
  end

  def update
    @news_item = NewsItem.find params[:id]
    if @news_item.update_attributes news_item_params
      flash[:success] = "Новость отредактирован"
      redirect_to admin_news_items_path
    else
      flash[:success] = "Ошибка отредактирования"
      redirect_to admin_news_items_path
    end
  end

  private

  def news_item_params
    params.require(:news_item).permit(:title, :preview, :content, :image, :slug, :image_alt)
  end

end

