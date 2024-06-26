class User < ApplicationRecord
  has_many :follows_as_followed, class_name: "Follow", foreign_key: :followed_id, inverse_of: :followed
  has_many :followers, through: :follows_as_followed, source: :follower

  has_many :follows_as_follower, class_name: "Follow", foreign_key: :follower_id, inverse_of: :follower
  has_many :followings, through: :follows_as_follower, source: :followed

  has_many :reacts
  has_many :posts, through: :reacts
end
