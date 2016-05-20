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

  private

  def set_content
    @staticContent = StaticContent.all
  end
end
