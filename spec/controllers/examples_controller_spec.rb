require 'rails_helper'

RSpec.describe ExamplesController, type: :controller do
  describe "GET #index" do
    before do
      @addCBR = 0.0
    end

    it "returns http success" do
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #show" do
    it "returns http success" do
      get :show, id: FactoryBot.create(:example)
      expect(response).to have_http_status(:success)
    end
  end

end
