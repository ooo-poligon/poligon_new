require 'rails_helper'

RSpec.describe Company, type: :model do
  it "has a valid factory" do
    expect(FactoryGirl.create(:company)).to be_valid
  end
end
