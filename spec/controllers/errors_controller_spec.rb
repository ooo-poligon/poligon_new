require 'rails_helper'

RSpec.describe ErrorsController, type: :controller do

  describe "GET #routing" do
    it "handle 404 server response" do
      sign_in User.new(group_id: 1)
      get :routing
      expect(response).to have_http_status(200)
    end
  end

end
