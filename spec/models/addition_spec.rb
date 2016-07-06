require 'rails_helper'

RSpec.describe Addition, type: :model do
  it "has a valid factory" do
    expect(FactoryGirl.create(:addition)).to be_valid
  end
end
