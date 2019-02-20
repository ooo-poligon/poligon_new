class Admin::BookletsController < Admin::BaseController

  def index
    @booklets = Booklet.all
    @booklets = Booklet.where(vendor_id: params[:vendor]) if params[:vendor]
  end

  def new
    @booklet = Booklet.new
  end

  def edit
    @booklet = Booklet.find params[:id]
  end

  def create
    @booklet = Booklet.new booklet_params
    if @booklet.save
      flash[:success] = "Каталог создан"
      redirect_to admin_booklets_path
    else
      flash[:success] = "Каталог не создан"
      redirect_to admin_booklets_path
    end
  end

  def update
    @booklet = Booklet.find params[:id]
    if @booklet.update_attributes booklet_params
      flash[:success] = "Каталог отредактирован"
      redirect_to admin_booklets_path
    else
      flash[:success] = "Ошибка редактирования"
      redirect_to admin_booklets_path
    end
  end

  def destroy
    @booklet = Booklet.find params[:id]
    if @booklet.destroy
      flash[:success] = "Каталог удален"
      redirect_to admin_booklets_path
    else
      flash[:success] = "Ошибка удаления"
      redirect_to admin_booklets_path
    end
  end

  private

  def booklet_params
    params.require(:booklet).permit(:title, :description, :image, :file, :print_version, :vendor_show, :block_size,
                                    :block_color, :border_color, :position, :vendor_id)
  end

end

