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
      flash[:success] = "Буклет создан"
      redirect_to admin_booklets_path
    else
      flash[:success] = "Буклет не создан"
      redirect_to admin_booklets_path
    end
  end

  def update
    @booklet = Booklet.find params[:id]
    if @booklet.update_attributes booklet_params
      flash[:success] = "Буклет отредактирован"
      redirect_to admin_booklets_path
    else
      flash[:success] = "Ошибка редактирования"
      redirect_to admin_booklets_path
    end
  end

  private

  def booklet_params
    params.require(:booklet).permit(:title, :description, :image, :file, :print_version, :vendor_show, :block_size,
                                    :block_color, :border_color, :position, :vendor_id)
  end

end
