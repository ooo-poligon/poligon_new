require 'rails_helper'

RSpec.describe Measure, type: :model do
  it "has a valid factory" do
    expect(FactoryGirl.create(:measure)).to be_valid
  end
end
