class LineItemsController < ApplicationController
  before_action :set_line_item, only: [:show, :edit, :update, :destroy]
  skip_before_filter :verify_authenticity_token, :only => [:update_quantity]

  # GET /line_items
  def index
    @line_items = LineItem.all
  end

  # GET /line_items/1
  def show
  end

  # GET /line_items/new
  def new
    @line_item = LineItem.new
  end

  # GET /line_items/1/edit
  def edit
  end

  # POST /line_items
  def create
    @cart = @current_cart
    product = Product.find(params[:product_id])
    
    quantity = params[:quantity].to_i

    if product.special_price > 0
      price = calculate_price(product, product.special_price)
    else
      price = calculate_price(product, product.base_price)
    end

    stock = product.quantity.nil? ? 0 : product.stock.to_i
    overflow = quantity - stock
    @line_item = @cart.add_product(product.id, quantity, price, overflow)

    respond_to do |format|
      if @line_item.save
        format.html { redirect_to @line_item.cart }
        format.json { render json: @line_item,
          status: :created, location: @line_item}
      else
        format.html { render action: new }
        format.json { render json: @line_item.errors,
          status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /line_items/1
  def update
    if @line_item.update(line_item_params)
      redirect_to @line_item, notice: 'Line item was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /line_items/1
  def destroy
    @line_item.destroy
    redirect_to line_items_url, notice: 'Line item was successfully destroyed.'
  end

  def update_quantity
    line_item = LineItem.find(params[:line_item_id])
    old_quantity = line_item.quantity
    new_quantity = params[:quantity]
    if line_item.update(quantity: new_quantity)
      quantity = new_quantity
    else
      quantity = old_quantity
    end
    line_items = LineItem.where(cart_id: @current_cart.id)
    total = 0
    line_items.each do |item|
      total += item.quantity * item.price
    end
    stock = line_item.product.quantity.nil? ? 0 : line_item.product.stock.to_i
    overflow = quantity.to_i - stock
    line_item.update(overflow: overflow)
    respond_to do |format|
      format.json { render json: {
          line_item_id: line_item.id,
          quantity: quantity,
          price: line_item.price * quantity.to_i,
          total: total,
          overflow: overflow,
          stock: stock
      }}
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_line_item
      @line_item = LineItem.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def line_item_params
      params.require(:line_item).permit(:product_id, :cart_id)
    end
end
