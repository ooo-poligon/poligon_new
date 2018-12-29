class Admin::SliderItemsController < Admin::BaseController

  def index
    @items = SliderItem.all
  end

  def new
    @item = SliderItem.new
  end

  def edit
    @item = SliderItem.find params[:id]
  end

  def create
    @item = SliderItem.new slider_item_params
    if @item.save
      flash[:success] = "Слайдер создан"
      redirect_to admin_slider_items_path
    else
      flash[:success] = "Слайдер не создан"
      redirect_to admin_slider_items_path
    end
  end

  def update
    @item = SliderItem.find params[:id]
    if @item.update_attributes slider_item_params
      flash[:success] = "Слайдер отредактирован"
      redirect_to admin_slider_items_path
    else
      flash[:success] = "Слайдер отредактировани"
      redirect_to admin_slider_items_path
    end
  end

  private

  def slider_item_params
    params.require(:slider_item).permit(:image, :url)
  end

end

