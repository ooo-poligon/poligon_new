require 'rails_helper'

RSpec.describe Vendor, type: :model do
  it "has a valid factory" do
    expect(FactoryBot.create(:vendor)).to be_valid
  end
end
