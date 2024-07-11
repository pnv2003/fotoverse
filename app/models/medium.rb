class Medium < ApplicationRecord
  belongs_to :post

  validates :post_id, presence: true
  # validates :url, presence: true

  mount_uploader :url, MediumUploader
end
