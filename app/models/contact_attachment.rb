class ContactAttachment < ActiveRecord::Base
  mount_uploader :file, ContactAttachmentUploader
  belongs_to :contact
end
