class Contact < ActiveRecord::Base
  has_many :contact_attachments
  accepts_nested_attributes_for :contact_attachments
end
