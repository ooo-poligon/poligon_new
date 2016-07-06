class FileType < ActiveRecord::Base
  has_many :data_files
end
