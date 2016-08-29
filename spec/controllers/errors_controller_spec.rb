require 'rails_helper'

RSpec.describe ErrorsController, type: :controller do

  describe "GET #routing" do
    it "handle 404 server response" do
      sign_in User.new(group_id: 1)
      get :not_found
      expect(response).to have_http_status(404)
    end

    it "handle 422 server response" do
      sign_in User.new(group_id: 1)
      get :not_processable
      expect(response).to have_http_status(422)
    end

    it "handle 500 server response" do
      sign_in User.new(group_id: 1)
      get :internal_server_error
      expect(response).to have_http_status(500)
    end
  end

end
