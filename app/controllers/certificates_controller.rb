class CertificatesController < ApplicationController

  include ActionController::Streaming
  include Zipline

  def index
    @certificates = Certificate.all
    @vendors = []
    @certificates.each do |s|
      @vendors.push Vendor.find(s.vendor_id) if !@vendors.include? Vendor.find(s.vendor_id)
    end
  end

  def show
  end

  def download
    require 'open-uri'
    vendor_id = params[:vendor_id][:vendor_id].to_i  # {"vendor_id"=>"3"}
    certificates_to_zip = []
    Certificate.all.each do |s|
      if s.vendor_id == vendor_id
        certificate_url  = s.pdf_path.gsub!("\\\\Server03\\бд_сайта\\poligon_certificates", "/poligon_certificates").gsub!("\\", "/")
        certificate_path = ('certificates/' + s.pdf_path.match(/([^\/]*)$/)[1])
        certificates_to_zip.push [certificate_url, certificate_path]
      end
    end
    file_mappings = certificates_to_zip.lazy.map { |url, path| [open(url), path] }
    #UserMailer.test_email(certificates_to_zip).deliver_now
    zipline(file_mappings, 'certificates.zip')
  end

end
