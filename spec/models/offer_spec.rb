require 'rails_helper'

RSpec.describe Offer, type: :model do
  it "has a valid factory" do
    expect(FactoryGirl.create(:offer)).to be_valid
  end
end
