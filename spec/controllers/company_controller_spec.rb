# -*- encoding : utf-8 -*-
require 'rails_helper'

RSpec.describe CompanyController, :type => :controller do

  describe "GET #about" do
    it "returns http success" do
      get :about
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #contacts" do
    it "returns http success" do
      get :contacts
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #vacancies" do
    it "returns http success" do
      get :vacancies
      expect(response).to have_http_status(:success)
    end
  end

end
