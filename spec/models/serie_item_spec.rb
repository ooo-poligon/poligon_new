require 'rails_helper'

RSpec.describe SeriesItem, type: :model do
  it "has a valid factory" do
    expect(FactoryGirl.create(:series_item)).to be_valid
  end
end
