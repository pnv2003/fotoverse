class Photo < Post
  has_one :medium, inverse_of: :post, dependent: :destroy
  accepts_nested_attributes_for :medium, allow_destroy: true
end
