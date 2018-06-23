class ExamplesController < ApplicationController

  def index
    @scopes   = Scope.all
    @tags     = Tag.all
    @examples = Example.all
    respond_to do |format|
      format.html
    end
  end

  def show
    @example = Example.find(params[:id])
  end

end
