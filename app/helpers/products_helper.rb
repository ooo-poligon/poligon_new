# -*- encoding : utf-8 -*-

require 'net/http'

module ProductsHelper

  def prop_image_path_for(product, prop, picture_number)
    number ||= picture_number.to_s
    vendor_title = Vendor.find(product.vendor_id).title.upcase
    vendor_title = "POLIGONSPB" if vendor_title == "ПОЛИГОН"
    vendor_title = "no_vendor"  if vendor_title == "не указан"
    extension = ".jpg"
    #extension = ".gif" if vendor_title == "POLIGONSPB"
    product_title = product.title.gsub(' ', '_').gsub('/', '_').upcase
    product_title = transliterize product_title if vendor_title == "POLIGONSPB"
    picture_path_exist_only "http://poligon.info/images/catalog/#{ vendor_title }/#{ prop }s/#{ product_title }_#{ prop + number + extension}"
  end

  private

  def picture_path_exist_only(picture_path)
    uri = URI(picture_path)
    request  = Net::HTTP.new uri.host
    response = request.request_head uri.path
    picture_path if response.code.to_i == 200
  end

  def transliterize (string)
    charray = string.split('')
    transliterized = []
    charray.each do |char|
      case char
      when 'А'
        transliterized << 'A'
      when 'Б'
        transliterized << 'B'
      when 'В'
        transliterized << 'V'
      when 'Г'
        transliterized << 'G'
      when 'Д'
        transliterized << 'D'
      when 'Е'
        transliterized << 'E'
      when 'Ё'
        transliterized << 'YO'
      when 'Ж'
        transliterized << 'ZH'
      when 'З'
        transliterized << 'Z'
      when 'И'
        transliterized << 'I'
      when 'Й'
        transliterized << 'I'
      when 'К'
        transliterized << 'K'
      when 'Л'
        transliterized << 'L'
      when 'М'
        transliterized << 'M'
      when 'Н'
        transliterized << 'N'
      when 'О'
        transliterized << 'O'
      when 'П'
        transliterized << 'P'
      when 'Р'
        transliterized << 'R'
      when 'С'
        transliterized << 'S'
      when 'Т'
        transliterized << 'T'
      when 'У'
        transliterized << 'U'
      when 'Ф'
        transliterized << 'F'
      when 'Х'
        transliterized << 'H'
      when 'Ц'
        transliterized << 'C'
      when 'Ч'
        transliterized << 'CH'
      when 'Ш'
        transliterized << 'SH'
      when 'Щ'
        transliterized << 'SSH'
      when 'Ъ'
        transliterized << '_'
      when 'Ы'
        transliterized << 'Y'
      when 'Ь'
        transliterized << '_'
      when 'Э'
        transliterized << 'E'
      when 'Ю'
        transliterized << 'YU'
      when 'Я'
        transliterized << 'YA'
      else
        transliterized << char
      end
    end
    transliterized.join
  end
end
