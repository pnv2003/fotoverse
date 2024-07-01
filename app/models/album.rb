class Album < Post
  has_many :media
  validates :media, length: { maximum: 25 }
end
