class Photo < Post
  validates :media, length: { maximum: 1 }
end
