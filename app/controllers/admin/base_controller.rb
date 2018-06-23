class Admin::BaseController < ApplicationController
  layout 'no_vendors'
  before_filter :not_authenticated

  private
  def not_authenticated
    unless user_signed_in?
      redirect_to new_user_session_path, alert: "Доступ запрещён! Сначала войдите в систему, используя Ваши логин и пароль."
    end
  end

end
