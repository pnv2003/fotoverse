class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :confirmable, :trackable, :omniauthable, omniauth_providers: [:google_oauth2, :facebook, :twitter]
  # has_secure_password

  has_many :follows_as_followed, class_name: "Follow", foreign_key: :followed_id, inverse_of: :followed, dependent: :destroy
  has_many :followers, class_name: "User", through: :follows_as_followed, source: :follower

  has_many :follows_as_follower, class_name: "Follow", foreign_key: :follower_id, inverse_of: :follower, dependent: :destroy
  has_many :followings, class_name: "User", through: :follows_as_follower, source: :followed

  has_many :posts, dependent: :destroy
  has_many :reactions, dependent: :destroy
  has_many :reacted_posts, class_name: "Post", through: :reactions, source: :post

  validates :fname, length: { maximum: 25 }
  validates :lname, length: { maximum: 25 }
  validates :email, presence: true, length: { maximum: 255 }, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: true
  # validates :password_digest, presence: true, confirmation: true, length: { maximum: 64 }
  validates :admin, inclusion: [true, false]
  validates :active, inclusion: [true, false]

  mount_uploader :avatar, AvatarUploader

  def self.from_omniauth auth
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|

      if auth.provider == "google_oauth2"
        user.fname = auth.info.first_name
        user.lname = auth.info.last_name
      elsif auth.provider == "facebook"
        user.fname = auth.info.name.split(" ")[0]
        user.lname = auth.info.name.split(" ")[1]
      elsif auth.provider == "twitter"
        user.fname = auth.info.name.split(" ")[0]
        user.lname = auth.info.name.split(" ")[1]
      end

      user.provide = auth.provider
      user.uid = auth.uid
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
      user.password_confirmation = user.password
      user.admin = false
      user.active = true
      user.skip_confirmation!
      user.save!
    end
  end
end
