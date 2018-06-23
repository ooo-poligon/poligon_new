class Admin::ExamplesController < Admin::BaseController

  def index
    @scopes   = Scope.all
    @tags     = Tag.all
    @examples = Example.all
    respond_to do |format|
      format.html
    end
  end

  def create

  end

  def new

  end

  def edit

  end

  def show
  end

  def update

  end

  def destroy

  end

end
