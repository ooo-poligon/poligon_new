class Admin::ScopesController < Admin::BaseController

  def index
    @scopes   = Scope.all

    respond_to do |format|
      format.html
    end
  end

  def show
  end

  def new
    @scope = Scope.new
  end

  def create
    @scope = Scope.new scope_params

    respond_to do |format|
      if @scope.save
        format.html { redirect_to admin_scopes_path }
      else
        format.html { render action: new }
      end
    end
  end

  def edit
    @scope = Scope.find params[:id]
  end

  def update
    @scope = Scope.find params[:id]

    respond_to do |format|
      if @scope.update_attributes scope_params
        format.html { redirect_to admin_scopes_path }
      else
        format.html { render action: edit }
      end
    end
  end

  def destroy
    Scope.find(params[:id]).destroy
    respond_to do |format|
      format.html { redirect_to admin_scopes_path }
      format.json { head :no_content }
      format.js   { render :layout => false }
    end
  end

  private

  def scope_params
    params.require(:scope).permit :name
  end

end
