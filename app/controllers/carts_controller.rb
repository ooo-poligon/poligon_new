class CartsController < ApplicationController
  respond_to :html, :json, :js

  def show
    @cart = Cart.find(params[:id])
    if session[:cart_id].to_s != params[:id]
      raise ActionController::RoutingError.new('Not Found')
    end
  rescue ActiveRecord::RecordNotFound
    logger.error "Попытка доступа к несуществующей корзине #{params[:id]}"
    redirect_to root_url, notice: 'Несуществующая корзина'
  else
    respond_to do |format|
      format.html
      format.json { render json: @cart}
      format.js
    end
  end

  def destroy
    @cart = @current_cart
    @cart.destroy
    session[:cart_id] = nil
    respond_to do |format|
      format.html { redirect_to root_url, notice: 'Ваша корзина пуста!'}
      format.json { head :ok}
    end
  end

  def update_cart_quantity
    respond_to do |format|
      format.js
    end
  end

  def update_cart_sum
    respond_to do |format|
      format.js
    end
  end

  def remove_from_cart
    remove_line_item
    respond_to do |format|
      format.js {}
    end
  end

  def remove_from_cart_modal
    remove_line_item
    respond_to do |format|
      format.js {}
    end
  end

  private

  def remove_line_item
    begin
      product = Product.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      logger.error("Attemptccess invalid product #{params[:id]}")
      respond_to do |format|
        format.html { redirect_to root_url, notice: 'Invalid product'}
      end
    else
      @cart = Cart.find(@current_cart.id)
      @product_id = product.id
      @current_line = @cart.remove_product(@product_id)
    end
  end
end
