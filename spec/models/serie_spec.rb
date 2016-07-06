require 'rails_helper'

RSpec.describe Serie, type: :model do
  it "has a valid factory" do
    expect(FactoryGirl.create(:serie)).to be_valid
  end
end
