require 'rails_helper'

describe NewsItemsController do
  describe 'GET #index' do
    before do
      sign_in nil
      get :index
    end
    it "expects page normal loading" do
      expect(response).to have_http_status(200)
    end
    it "expects page have content type HTML" do
      expect(response.headers["Content-Type"]).to eq "text/html; charset=utf-8"
    end
    it "expects page was rendered with layout 'application'" do
      expect(response).to render_template(layout: 'layouts/application')
    end
    it "expects page was rendered with template 'index'" do
      expect(response).to render_template('news_items/index')
    end
  end

  describe 'GET #show' do
    before do
      sign_in nil
      get :show, id: FactoryBot.create(:news_item)
    end
    it "expects page normal loading" do
      expect(response).to have_http_status(200)
    end
    it "expects page have content type HTML" do
      expect(response.headers["Content-Type"]).to eq "text/html; charset=utf-8"
    end
    it "expects page was rendered with layout 'application'" do
      expect(response).to render_template(layout: 'layouts/application')
    end
    it "expects page was rendered with template 'show'" do
      expect(response).to render_template('news_items/show')
    end
  end
end
