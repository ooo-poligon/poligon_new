class Admin::StaticContentsController < Admin::BaseController

  def index
    @static_contents = StaticContent.all
  end

  def edit
    @static_content = StaticContent.find params[:id]
  end

  def update
    @static_content = StaticContent.find(params[:id])
    if @static_content.update_attributes static_content_params
      flash[:success] = "Отредактировано"
      redirect_to admin_static_contents_path
    else
      flash[:success] = "Ошибка редактирования"
      redirect_to admin_static_contents_path
    end
  end

  private

  def static_content_params
    params.require(:static_content).permit(:content)
  end

end
