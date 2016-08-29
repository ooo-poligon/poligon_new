require 'rails_helper'

describe AnnounceController do
  describe 'GET #index' do
    before do
      get :index
    end
    it "expects page normal loading" do
      expect(response).to have_http_status(200)
    end
    it "expects page have content type XML" do
      expect(response.headers["Content-Type"]).to eq "application/xml; charset=utf-8"
    end
    it "expects page not renders with any layout" do
      expect(response).not_to render_template(layout: 'layouts/application')
    end
    it "expects page was rendered with template 'index'" do
      expect(response).to render_template('announce/index')
    end
  end
end
