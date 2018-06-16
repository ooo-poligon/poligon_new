class Cart < ActiveRecord::Base
  has_many :line_items, dependent: :destroy

  def add_product(product_id, quantity, price, overflow)
    current_item = line_items.find_by_product_id(product_id)
    if current_item
      current_item.quantity += quantity
      current_item.price = price * current_item.quantity
    else
      current_item = line_items.build(product_id: product_id, quantity: quantity, price: price, overflow: overflow)
    end
    current_item
  end

  def remove_product(product_id)
    li = self.line_items.find_by_product_id(product_id)
    li.destroy
  end

  def minus_product(product_id)
    li = self.line_items.find_by_product_id(product_id)
    if li
      if li.quantity < 2
        li.destroy
      else
        li.quantity -= 1
        li.save
      end
      li
    end
  end

  def total_price
    line_items.to_a.sum(&:total_price)
  end
end
