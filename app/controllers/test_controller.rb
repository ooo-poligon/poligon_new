class TestController < ApplicationController

  def show
    #@content = %x(php /home/deploy/poligon/current/public/name_vision.php) if Rails.env == "production"
    @content = `php /home/vladlaptev/projects/poligon_new/public/name_vision.php '#{params[:page]}' &` if Rails.env == "development"
    @content = `php /home/deploy/poligon/current/public/name_vision.php'#{params[:page]}'` if Rails.env == "staging"
  end
end