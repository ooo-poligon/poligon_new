require 'rails_helper'

RSpec.describe Article, type: :model do
  it "has a valid factory" do
    expect(FactoryGirl.create(:article)).to be_valid
  end

  it "is invalid without a title" do
    expect(FactoryGirl.build(:article, title: nil)).not_to be_valid
  end

  it "is invalid without a content" do
    expect(FactoryGirl.build(:article, content: nil)).not_to be_valid
  end

  it "is invalid without a image_path" do
    expect(FactoryGirl.build(:article, image_path: nil)).not_to be_valid
  end
end
