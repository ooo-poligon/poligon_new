require 'rails_helper'

RSpec.describe Analog, type: :model do
  it "has a valid factory" do
    expect(FactoryGirl.create(:analog)).to be_valid
  end
end
