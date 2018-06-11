class ContentController < ApplicationController
  require 'open-uri'
  require 'uri'

  def show
    @content = StaticContent.where(:directory => 'content')
  end

  def home
    @content = StaticContent.where(:directory => 'content', :page => 'homepage')
  end

  def download_pdf
    product_pdf = DataFile.where("owner_id = ? and file_type_id = 2", params[:product_id]).first
    if product_pdf != nil and product_pdf.path != "c:\\poligon_datasheets\\" and product_pdf.path != "\\\\Server03\\бд_сайта\\poligon_datasheets\\"
      if product_pdf.path[0] != 'c'
        pdf_path = product_pdf.path.gsub("\\\\Server03\\бд_сайта\\poligon_datasheets\\datasheets", "http://www.poligon.info/PDF").gsub("\\", "/")
      else
        pdf_path = product_pdf.path.gsub("c:\\poligon_datasheets\\datasheets", "http://www.poligon.info/PDF").gsub("\\", "/")
      end

      pdf_path = URI.escape(pdf_path)
      temp_pdf = "#{Rails.root}/public/data/temp/" + URI.escape(product_pdf.name)
      unless File.file?(temp_pdf)
        open(temp_pdf, 'wb') do |file|
          file << open(pdf_path).read
        end
      end
      send_file temp_pdf

      # Удаляем временно загруженный файл в новом потоке с небольшой задержкой,
      # т.к. иначе при скачивании этого файла получаем "Failed - Network error"
      # Всли бы все файлы для скачивания лежали по доступному рельсам пути,
      # а не в /var/www/poligon/data/www/poligon.info/
      # всё это городить не пришлось бы
      Thread.new do
        sleep(0.5)
        FileUtils.rm(temp_pdf)
      end
    end
  end
end
