class Cart < ActiveRecord::Base
  has_many :line_items, dependent: :destroy

  def add_product(product_id, quantity, price)
    current_item = line_items.find_by_product_id(product_id)
    if current_item
      current_item.quantity += quantity
      current_item.price = price * current_item.quantity
    else
      current_item = line_items.build(product_id: product_id, quantity: quantity, price: price)
    end
    current_item
  end

  def total_price
    line_items.to_a.sum(&:total_price)
  end
end
