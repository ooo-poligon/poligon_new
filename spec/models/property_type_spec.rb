require 'rails_helper'

RSpec.describe PropertyType, type: :model do
  it "has a valid factory" do
    expect(FactoryGirl.create(:property_type)).to be_valid
  end
end
