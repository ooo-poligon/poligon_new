require 'rails_helper'

RSpec.describe NewsItem, type: :model do
  it "has a valid factory" do
    expect(FactoryGirl.create(:news_item)).to be_valid
  end

  it "is invalid without a title" do
    expect(FactoryGirl.build(:news_item, title: nil)).not_to be_valid
  end

  it "is invalid without a preview" do
    expect(FactoryGirl.build(:news_item, preview: nil)).not_to be_valid
  end

  it "is invalid without a content" do
    expect(FactoryGirl.build(:news_item, content: nil)).not_to be_valid
  end

  it "is invalid without a image_path" do
    expect(FactoryGirl.build(:news_item, image_path: nil)).not_to be_valid
  end
end
