class Album < Post
  validates :media, length: { maximum: 25 }
end
