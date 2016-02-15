class FeedbackController < ApplicationController
  def show
    @content = StaticContent.where(:directory => 'feedback')
  end
end
