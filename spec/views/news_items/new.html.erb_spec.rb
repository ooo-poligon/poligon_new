require 'rails_helper'

RSpec.describe "news_items/new", :type => :view do
  before(:each) do
    assign(:news_item, NewsItem.new(
      :title => "MyString",
      :content => "MyString"
    ))
  end

  it "renders new news_item form" do
    render

    assert_select "form[action=?][method=?]", news_items_path, "post" do

      assert_select "input#news_item_title[name=?]", "news_item[title]"

      assert_select "input#news_item_content[name=?]", "news_item[content]"
    end
  end
end
