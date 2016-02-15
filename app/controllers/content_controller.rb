class ContentController < ApplicationController
  def show
    @content = StaticContent.where(:directory => 'content')
  end

  def home
    @content = StaticContent.where(:directory => 'content', :page => 'homepage')
  end
end
