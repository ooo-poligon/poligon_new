require 'rails_helper'

RSpec.describe Quantity, type: :model do
  it "has a valid factory" do
    expect(FactoryBot.create(:quantity)).to be_valid
  end
end
