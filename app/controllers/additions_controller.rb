class AdditionsController < ApplicationController
  def index
    @additions = Addition.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @additions }
    end
  end

  def show
    @addition = Addition.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @addition }
    end
  end
end
