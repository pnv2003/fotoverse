class Follow < ApplicationRecord
  belongs_to :follower, class_name: "User", foreign_key: :follower_id, inverse_of: :follows_as_follower
  belongs_to :followed, class_name: "User", foreign_key: :followed_id, inverse_of: :follows_as_followed

  validates :follower_id, presence: true
  validates :followed_id, presence: true
  validates :follower_id, uniqueness: { scope: :followed_id }
  validate :not_following_self

  private
  def not_following_self
    if followed_id == follower_id
      errors.add(:follower_id, "you can't follow yourself")
    end
  end
end
