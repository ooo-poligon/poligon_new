  class OrdersController < ApplicationController
  before_action :set_order, only: [:show, :edit, :update, :destroy]

  # GET /orders
  def index
    @orders = Order.all
  end

  # GET /orders/1
  def show
  end

  # GET /orders/new
  def new
    @order = Order.new
    # respond_to do |format|
    #   format.html new.html.erb
    #   format.json { render json: @order }
    # end
  end

  # GET /orders/1/edit
  def edit
  end

  # POST /orders
  def create
    if @current_cart.line_items.empty?
      redirect_to order_path, notice: 'Ваша корзина пуста'
      return
    end
    line_items = LineItem.where(cart_id: params[:cart])
    @order = Order.new(order_params)

    if @order.save
      redirect_to @order, notice: 'Заказ принят.'
    else
      render :new
    end
  end

  # PATCH/PUT /orders/1
  def update
    if @order.update(order_params)
      redirect_to @order, notice: 'Order was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /orders/1
  def destroy
    @order.destroy
    redirect_to orders_url, notice: 'Order was successfully destroyed.'
  end

  def send_order_email
    @phone = params[:phone] ? params[:phone] : params[:phone_wait]
    @name = params[:name]
    @email = params[:email]
    @address = params[:address]
    @requisites = params[:requisites]

    if @phone != ''

      order = Order.new(phone: @phone)
      order.save
      line_items = params[:items].to_unsafe_h

      line_items.each do |id, item|
        line_values = to_hash item
        line_item = LineItem.find(id)
        line_item.update(quantity: line_values['quantity'].to_i, price: line_values['price'].to_f, order_id: order.id, cart_id: nil)
      end

      binding.pry
      
      #UserMailer.products_order_email(@phone, order, @name, @email, @address, @requisites).deliver_now
      
      respond_to do |format|
        format.html { redirect_to root_url, notice: {title: 'Спасибо, мы получили Вашу заявку.', message: ' В ближайшее время менеджер свяжется с Вами.'}}
      end
    else
      # flash[:error] = "Поле e-mail не заполнено!"
      redirect_to new_order_url, notice: "Поле e-mail не заполнено!"
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_order
      @order = Order.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def order_params
      params.require(:order).permit(:name, :address, :email, :items, :cart)
    end

  def to_hash(string, arr_sep=';', key_sep=':')
    array = string.split(arr_sep)
    hash = {}

    array.each do |e|
      key_value = e.split(key_sep)
      hash[key_value[0]] = key_value[1]
    end

    hash
  end
end