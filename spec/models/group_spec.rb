require 'rails_helper'

RSpec.describe Group, type: :model do
  it "has a valid factory" do
    expect(FactoryGirl.create(:group)).to be_valid
  end
end
