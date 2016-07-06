require 'rails_helper'

RSpec.describe NewsItem, type: :model do
  it "has a valid factory" do
    expect(FactoryGirl.create(:news_item)).to be_valid
  end
end
