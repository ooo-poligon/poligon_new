class Admin::PanelController < ApplicationController

  def index
    render layout: 'no_vendors'
  end

end
