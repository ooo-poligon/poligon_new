# -*- encoding : utf-8 -*-
require 'rails_helper'

RSpec.describe "products/edit", :type => :view do
  before(:each) do
    @product = assign(:product, Product.create!(
      :title => "MyString",
      :short_description => "MyText",
      :image_url => "MyString",
      :retail_price => "9.99"
    ))
  end

  it "renders the edit product form" do
    render

    assert_select "form[action=?][method=?]", product_path(@product), "post" do

      assert_select "input#product_title[name=?]", "product[title]"

      assert_select "textarea#product_short_description[name=?]", "product[short_description]"

      assert_select "input#product_image_url[name=?]", "product[image_url]"

      assert_select "input#product_retail_price[name=?]", "product[retail_price]"
    end
  end
end
