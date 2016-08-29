require 'rails_helper'

RSpec.describe AnalogsVariant, type: :model do
  it "has a valid factory" do
    expect(FactoryGirl.create(:analogs_variant)).to be_valid
  end
end
