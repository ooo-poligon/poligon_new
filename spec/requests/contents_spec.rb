require 'rails_helper'

RSpec.describe "Contents", type: :request do
  describe "GET /" do
    it "works! (now write some real specs)" do
      get content_certificates
      expect(response).to have_http_status(200)
    end
  end
end
