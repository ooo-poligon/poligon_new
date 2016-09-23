# -*- encoding : utf-8 -*-

require 'net/http'
#require 'uri'

module ProductsHelper

  def prop_image_path_for(product, prop, picture_number)
    number ||= picture_number.to_s
    vendor_title = Vendor.find(product.vendor_id).title.upcase
    #vendor_title = "ПОЛИГОН"
    vendor_title = "POLIGONSPB" if vendor_title == "ПОЛИГОН"
    vendor_title = "no_vendor"  if vendor_title == "не указан"
    extension = ".jpg"
    product_title = product.title.gsub(' ', '_').gsub('/', '_').upcase
    product_title = transliterize product_title
    picture_path_exist_only "http://poligon.info/images/catalog/#{ vendor_title }/#{ prop }s/#{ product_title }_#{ prop + number + extension}"
  end

  private

  def validated(uri)
    URI.escape uri.gsub('<', '_').gsub('>', '_').gsub('^', '_').gsub('\"', '_').gsub('\'', '_').gsub(' ', '_')
  end

  def picture_path_exist_only(picture_path)
    uri = URI(validated picture_path)
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
      when 'а'
        transliterized << 'A'
      when 'б'
        transliterized << 'B'
      when 'в'
        transliterized << 'V'
      when 'г'
        transliterized << 'G'
      when 'д'
        transliterized << 'D'
      when 'е'
        transliterized << 'E'
      when 'ё'
        transliterized << 'YO'
      when 'ж'
        transliterized << 'ZH'
      when 'з'
        transliterized << 'Z'
      when 'и'
        transliterized << 'I'
      when 'й'
        transliterized << 'I'
      when 'к'
        transliterized << 'K'
      when 'л'
        transliterized << 'L'
      when 'м'
        transliterized << 'M'
      when 'н'
        transliterized << 'N'
      when 'о'
        transliterized << 'O'
      when 'п'
        transliterized << 'P'
      when 'р'
        transliterized << 'R'
      when 'с'
        transliterized << 'S'
      when 'т'
        transliterized << 'T'
      when 'у'
        transliterized << 'U'
      when 'ф'
        transliterized << 'F'
      when 'х'
        transliterized << 'H'
      when 'ц'
        transliterized << 'C'
      when 'ч'
        transliterized << 'CH'
      when 'ш'
        transliterized << 'SH'
      when 'щ'
        transliterized << 'SSH'
      when 'ъ'
        transliterized << '_'
      when 'ы'
        transliterized << 'Y'
      when 'ь'
        transliterized << '_'
      when 'э'
        transliterized << 'E'
      when 'ю'
        transliterized << 'YU'
      when 'я'
        transliterized << 'YA'
      else
        if char.ascii_only?
          transliterized << char
        else
          transliterized << '_'
        end
      end
    end
    transliterized.join
  end
end
