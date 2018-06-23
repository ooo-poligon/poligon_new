class Admin::ExamplesController < Admin::BaseController

  def index
    @scopes   = Scope.all
    @tags     = Tag.all
    @examples = Example.all
    respond_to do |format|
      format.html
    end
  end

  def show
  end

  def new
    @example = Example.new
  end

  def create
    @example = Example.new example_params

    respond_to do |format|
      if @example.save
        format.html { redirect_to admin_examples_path }
      else
        format.html { render action: new }
      end
    end
  end

  def edit
    @example = Example.find params[:id]
  end

  def update
    @example = Example.find params[:id]

    respond_to do |format|
      if @example.update_attributes example_params
        format.html { redirect_to admin_examples_path }
      else
        format.html { render action: edit }
      end
    end
  end

  def destroy
    Example.find(params[:id]).destroy
    respond_to do |format|
      format.html { redirect_to admin_examples_path }
      format.json { head :no_content }
      format.js   { render :layout => false }
    end
  end

  private

  def example_params
    params.require(:example).permit :title, :issue, :solution, :scope_id, :product_id
  end

end
