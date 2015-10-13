# -*- encoding : utf-8 -*-
require 'rails_helper'

RSpec.describe "products/new", :type => :view do
  before(:each) do
    assign(:product, Product.new(
      :title => "MyString",
      :short_description => "MyText",
      :image_url => "MyString",
      :retail_price => "9.99"
    ))
  end

  it "renders new product form" do
    render

    assert_select "form[action=?][method=?]", products_path, "post" do

      assert_select "input#product_title[name=?]", "product[title]"

      assert_select "textarea#product_short_description[name=?]", "product[short_description]"

      assert_select "input#product_image_url[name=?]", "product[image_url]"

      assert_select "input#product_retail_price[name=?]", "product[retail_price]"
    end
  end
end
