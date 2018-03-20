require 'rails_helper'

RSpec.describe Certificate, type: :model do
  it "has a valid factory" do
    expect(FactoryBot.create(:certificate)).to be_valid
  end
end
