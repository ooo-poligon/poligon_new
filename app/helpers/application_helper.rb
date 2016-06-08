# -*- encoding : utf-8 -*-
module ApplicationHelper
  def quantity_image_for product_id
    unless Quantity.find_by(product_id: product_id).nil?
      if (Quantity.find_by(product_id: product_id).stock - Quantity.find_by(product_id: product_id).reserved).to_i > 0
        "/assets/green.gif"
      else
        "/assets/grey.gif"
      end
    else
      "/assets/grey.gif"
    end
  end
end
