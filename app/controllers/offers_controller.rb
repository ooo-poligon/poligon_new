class OffersController < ApplicationController
  def index
    @products = []
    addCBR = Setting.find_by title: 'addCBR'

    @products_list = Product.available.where(special_offer: 1)
    if params[:vendor]
      vendor = Vendor.find_by(title: params[:vendor])
      @products_list = @products_list.where(vendor_id: vendor.id)
    end

    @products_list.each do |product|
      vendor = Vendor.find(product.vendor_id)
      
      one_product_array = []
      product_price = 0

      if product.currency_id == 1
        product_price = (product.base_price * (@courseEuro + (@courseEuro / 100) * addCBR.text_value.to_f)).round(2)
      elsif product.currency_id == 2
        product_price = product.base_price.round(2)
      end
      
      quantity = product.stock
      #if quantity > 0
      one_product_array.push(product, product_price, quantity, vendor)
      @products.push(one_product_array)
      #end
    end

    @products = @products.paginate(:page => params[:page], :per_page => 10)
  end

end
