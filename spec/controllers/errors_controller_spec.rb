require 'rails_helper'

RSpec.describe ErrorsController, type: :controller do

  describe "GET #routing" do
    it "handle 404 server response" do
      sign_in_as_a_user
      get :routing
      expect(response).to have_http_status(404)
    end
  end

end
