require 'rails_helper'

RSpec.describe "news_items/show", :type => :view do
  before(:each) do
    @news_item = assign(:news_item, NewsItem.create!(
      :title => "Title",
      :content => "Content"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Title/)
    expect(rendered).to match(/Content/)
  end
end
