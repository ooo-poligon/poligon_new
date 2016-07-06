require 'rails_helper'

RSpec.describe FileType, type: :model do
  it "has a valid factory" do
    expect(FactoryGirl.create(:file_type)).to be_valid
  end
end
