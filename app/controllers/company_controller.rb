# -*- encoding : utf-8 -*-
class CompanyController < ApplicationController
  def about
    @time = Time.now
    @files = Dir.glob('*')
  end

  def contacts
  end

  def vacancies
  end
end
