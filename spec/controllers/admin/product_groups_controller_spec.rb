require 'rails_helper'

RSpec.describe Admin::ProductGroupsController, type: :controller do

  describe "GET #index" do
    login_admin

    it "returns http success" do
      @addCBR = 0.0
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #show" do
    login_admin

    it "returns http success" do
      get :show, id: FactoryBot.create(:product_group)
          expect(response).to have_http_status(:success)
    end
  end

end
