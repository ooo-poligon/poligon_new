# -*- encoding : utf-8 -*-
class CompanyController < ApplicationController
  def about
    @staticContent = StaticContent.all
  end

  def contacts
    @staticContent = StaticContent.all
  end

  def vacancies
    @staticContent = StaticContent.all
  end

  def sitemap
  end

  def links
  end
end
