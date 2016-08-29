class DataFile < ActiveRecord::Base
  self.table_name = "files"
  belongs_to :file_type
  belongs_to :product
end
