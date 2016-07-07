require 'rails_helper'

RSpec.describe StaticContent, type: :model do
  it "has a valid factory" do
    expect(FactoryGirl.create(:static_content)).to be_valid
  end
end
