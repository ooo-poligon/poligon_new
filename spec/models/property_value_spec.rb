require 'rails_helper'

RSpec.describe PropertyValue, type: :model do
  it "has a valid factory" do
    expect(FactoryBot.create(:property_value)).to be_valid
  end
end
