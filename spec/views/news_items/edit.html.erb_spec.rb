require 'rails_helper'

RSpec.describe "news_items/edit", :type => :view do
  before(:each) do
    @news_item = assign(:news_item, NewsItem.create!(
      :title => "MyString",
      :content => "MyString"
    ))
  end

  it "renders the edit news_item form" do
    render

    assert_select "form[action=?][method=?]", news_item_path(@news_item), "post" do

      assert_select "input#news_item_title[name=?]", "news_item[title]"

      assert_select "input#news_item_content[name=?]", "news_item[content]"
    end
  end
end
