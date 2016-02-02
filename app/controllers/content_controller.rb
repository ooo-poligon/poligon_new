class ContentController < ApplicationController
  def show
    @content = StaticContent.where(:directory => 'content')
  end
end
