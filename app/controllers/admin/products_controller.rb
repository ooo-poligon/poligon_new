class Admin::ProductsController < Admin::BaseController
  def index
    @products = Product.available.order(:title)

    respond_to do |format|
      format.html
    end
  end

  def show
  end

  def new
    # @product = Product.new
  end

  def create
    # @product = Product.new product_params
    #
    # respond_to do |format|
    #   if @product.save
    #     format.html { redirect_to admin_products_path }
    #   else
    #     format.html { render action: new }
    #   end
    # end
  end

  def edit
    @product = Product.find params[:id]
  end

  def update
    @product = Product.find params[:id]

    respond_to do |format|
      if @product.update_attributes product_params
        format.html { redirect_to admin_products_path }
      else
        format.html { render action: edit }
      end
    end
  end

  def destroy
    # Product.find(params[:id]).destroy
    # respond_to do |format|
    #   format.html { redirect_to admin_products_path }
    #   format.json { head :no_content }
    #   format.js   { render :layout => false }
    # end
  end

  private

  def product_params
    params.require(:product).permit :advantages
  end
end
