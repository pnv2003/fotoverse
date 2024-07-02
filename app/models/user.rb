class User < ApplicationRecord
  has_many :follows_as_followed, class_name: "Follow", foreign_key: :followed_id, inverse_of: :followed
  has_many :followers, class_name: "User", through: :follows_as_followed, source: :follower

  has_many :follows_as_follower, class_name: "Follow", foreign_key: :follower_id, inverse_of: :follower
  has_many :followings, class_name: "User", through: :follows_as_follower, source: :followed

  has_many :posts
  has_many :reactions
  has_many :reacted_posts, class_name: "Post", through: :reactions, source: :post

  validates :fname, length: { maximum: 25 }
  validates :lname, length: { maximum: 25 }
  validates :email, presence: true, length: { maximum: 255 }, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: true
  validates :password_digest, presence: true, confirmation: true, length: { maximum: 64 }
  validates :admin, inclusion: [true, false]
  validates :active, inclusion: [true, false]
end
