class Post < ApplicationRecord
  belongs_to :user

  has_many :reactions
  has_many :users, through: :reactions

  validates :user_id, presence: true
  validates :type, presence: true, inclusion: { in: %w(Photo Album) }
  validates :title, presence: true, length: { maximum: 140 }
  validates :description, presence: true, length: { maximum: 300 }
  validates :mode, presence: true, inclusion: { in: %w(public private) }
  validates :media, presence: true
end
