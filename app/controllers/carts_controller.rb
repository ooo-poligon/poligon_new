class CartsController < ApplicationController
  respond_to :html, :json, :js

  def show
    @cart = Cart.find(params[:id])
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
end
