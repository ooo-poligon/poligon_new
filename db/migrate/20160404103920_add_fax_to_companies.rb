class AddFaxToCompanies < ActiveRecord::Migration
  def change
    add_column :companies, :fax, :string
  end
end
