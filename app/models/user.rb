class User < ApplicationRecord
  has_many :follows_as_followed, class_name: "Follow", foreign_key: :followed_id, inverse_of: :followed
  has_many :followers, through: :follows_as_followed, source: :follower

  has_many :follows_as_follower, class_name: "Follow", foreign_key: :follower_id, inverse_of: :follower
  has_many :followings, through: :follows_as_follower, source: :followed

  has_many :reactions
  has_many :posts, through: :reactions

  validates :fname, length: { maximum: 25 }
  validates :lname, length: { maximum: 25 }
  validates :email, presence: true, length: { maximum: 255 }, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, presence: true, confirmation: true, length: { maximum: 64 }
  validates :role, presence: true, inclusion: { in: %w(member admin)}
  validates :active, inclusion: [true, false]
end
