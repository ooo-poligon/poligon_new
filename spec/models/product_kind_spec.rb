require 'rails_helper'

RSpec.describe ProductKind, type: :model do
  it "has a valid factory" do
    expect(FactoryBot.create(:product_kind)).to be_valid
  end
end
