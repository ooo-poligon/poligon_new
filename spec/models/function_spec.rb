require 'rails_helper'

RSpec.describe Function, type: :model do
  it "has a valid factory" do
    expect(FactoryGirl.create(:function)).to be_valid
  end
end
