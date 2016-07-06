require 'rails_helper'

RSpec.describe Video, type: :model do
  it "has a valid factory" do
    expect(FactoryGirl.create(:video)).to be_valid
  end
end
