class ContentController < ApplicationController
  require 'open-uri'
  require 'uri'

  def show
    @content = StaticContent.where(:directory => 'content')
  end

  def home
    @content = StaticContent.where(:directory => 'content', :page => 'homepage')
  end

  def delivery

  end

  def download_pdf
    product_pdf = Product.find(params[:product_id]).pdf_name
    vendor_folder_name = Vendor.find(Product.find(params[:product_id]).vendor_id).folder_name
    if product_pdf != nil and product_pdf != ""
        pdf_path = "/PDF/" + vendor_folder_name + "/" + product_pdf

      pdf_path = URI.escape(pdf_path)

      temp_pdf = "#{Rails.root}/public/data/temp/" + URI.escape(product_pdf)
      unless File.file?(temp_pdf)
        open(temp_pdf, 'wb') do |file|
          file << open(pdf_path).read
        end
      end
      send_file temp_pdf

      # Удаляем временно загруженный файл в новом потоке с небольшой задержкой,
      # т.к. иначе при скачивании этого файла получаем "Failed - Network error"
      # Всли бы все файлы для скачивания лежали по доступному рельсам пути,
      # всё это городить не пришлось бы
      Thread.new do
        sleep(3)
        FileUtils.rm(temp_pdf)
      end
    end
  end
end
