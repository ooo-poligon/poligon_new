require 'rails_helper'

RSpec.describe Analog, type: :model do
  it "has a valid factory" do
    expect(FactoryBot.create(:analog)).to be_valid
  end
end
