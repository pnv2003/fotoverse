class Post < ApplicationRecord
  belongs_to :user

  validates :user_id, presence: true

  has_many :reacts
  has_many :users, through: :reacts
end
