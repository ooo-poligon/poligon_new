require 'rails_helper'

RSpec.describe Currency, type: :model do
  it "has a valid factory" do
    expect(FactoryGirl.create(:currency)).to be_valid
  end
end
