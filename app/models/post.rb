class Post < ApplicationRecord
  belongs_to :user

  has_many :reactions, dependent: :destroy
  has_many :reactors, class_name: "User", through: :reactions, source: :user

  validates :user_id, presence: true
  validates :type, presence: true, inclusion: { in: %w(Photo Album) }
  validates :title, presence: true, length: { maximum: 140 }
  validates :description, presence: true, length: { maximum: 300 }
  validates :mode, presence: true, inclusion: { in: %w(public private) }
end
