# -*- encoding : utf-8 -*-

require 'net/http'

module ProductsHelper

  def prop_image_path_for(product, prop, picture_number)
    number ||= picture_number.to_s
    vendor_title = Vendor.find(product.vendor_id).title.upcase
    product_title = product.title.gsub(' ', '_').gsub('/', '_').upcase
    picture_path_exist_only "http://poligon.info/images/catalog/#{ vendor_title }/#{ prop }s/#{ product_title }_#{ prop + number }.jpg"
  end

  private

  def picture_path_exist_only(picture_path)
    uri = URI(picture_path)
    request  = Net::HTTP.new uri.host
    response = request.request_head uri.path
    picture_path if response.code.to_i == 200
  end
end
