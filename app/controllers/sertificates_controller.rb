class SertificatesController < ApplicationController

  include ActionController::Streaming
  include Zipline

  def index
    @sertificates = Sertificate.all
    @vendors = []
    @sertificates.each do |s|
      @vendors.push Vendor.find(s.vendor_id) if !@vendors.include? Vendor.find(s.vendor_id)
    end
  end

  def show
  end

  def download
    require 'open-uri'
    vendor_id = params[:vendor_id][:vendor_id].to_i  # {"vendor_id"=>"3"}
    sertificates_to_zip = []
    Sertificate.all.each do |s|
      if s.vendor_id == vendor_id
        sertificate_url  = s.pdf_path.gsub!("c:\\poligon_sertificates", "http://www.poligon.info/poligon_sertificates").gsub!("\\", "/")
        sertificate_path = ('sertificates/' + s.pdf_path.match(/([^\/]*)$/)[1])
        sertificates_to_zip.push [sertificate_url, sertificate_path]
      end
    end
    file_mappings = sertificates_to_zip.lazy.map { |url, path| [open(url), path] }
    #UserMailer.test_email(sertificates_to_zip).deliver_now
    zipline(file_mappings, 'sertificates.zip')
  end

end
