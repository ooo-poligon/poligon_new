class RenameSertificates < ActiveRecord::Migration
  def self.up
      rename_table :sertificates, :certificates
  end

  def self.down
      rename_table :certificates, :sertificates
  end
end
