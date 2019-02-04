class Admin::SettingsController < Admin::BaseController
  def index
    @settings = Setting.all
  end

  def edit
    @setting = Setting.find params[:id]
  end

  def update
    @setting = Setting.find params[:id]
    if @setting.update_attributes settings_params
      flash[:success] = "Настройка отредактирована"
      redirect_to admin_settings_path
    else
      flash[:success] = "Ошибка редактирования"
      redirect_to admin_settings_path
    end
  end

  private

  def settings_params
    params.require(:setting).permit(:text_value)
  end
end
