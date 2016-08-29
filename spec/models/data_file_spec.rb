require 'rails_helper'

RSpec.describe DataFile, type: :model do
  it "has a valid factory" do
    expect(FactoryGirl.create(:data_file)).to be_valid
  end
end
