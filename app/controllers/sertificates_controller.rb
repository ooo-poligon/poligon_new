class SertificatesController < ApplicationController
  before_action :set_archive, only: [:download]

  def index
    @sertificates = Sertificate.all
    @vendors = []
    @sertificates.each do |s|
      @vendors.push Vendor.find(s.vendor_id)
    end
  end

  def show
  end

  def download
    send_file @archive
  end

  private

  def set_archive
    vendor_id = params[:vendor_id]
    sertificates_for_archive = []
    Sertificate.all.each do |s|
      if s.vendor_id == vendor_id
        sertificates_for_archive.push s.pdf_path
      end
    end
    #@archive = package_of sertificates_for_archive
    #@archive = "#{Rails.root}/public/files/sertificates/BENEDICT/BENEDICT_sertificate_2015-2020_01.pdf"
  end

  def package_of array_for_archiving
  end
end
