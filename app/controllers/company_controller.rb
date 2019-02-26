# -*- encoding : utf-8 -*-
class CompanyController < ApplicationController

  before_filter :set_content

  def about
  end

  def contacts
  end

  def vacancies
  end

  def links
  end

  def personal
  end

  def delivery
  end

  def agreement
  end

  def privacy_policy
  end

  def project_offer
  end

  def dealer_offer
  end

  def program
    @vendors = Vendor.where(delivery_program: 1)
  end

  private

  def set_content
    @staticContent = StaticContent.all
  end
end
