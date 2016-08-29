require 'rails_helper'

RSpec.describe Video, type: :model do
  it "has a valid factory" do
    expect(FactoryGirl.create(:video)).to be_valid
  end

  it "is invalid without a title" do
    expect(FactoryGirl.build(:video, title: nil)).not_to be_valid
  end

  it "is invalid without a content" do
    expect(FactoryGirl.build(:video, content: nil)).not_to be_valid
  end

  it "is invalid without a image_path" do
    expect(FactoryGirl.build(:video, image_path: nil)).not_to be_valid
  end
end
