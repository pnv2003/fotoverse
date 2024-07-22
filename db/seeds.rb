# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

MAX_FOLLOW_COUNT = 100
MAX_REACT_COUNT = 100

# admin
User.create(fname: "Phuong", lname: "Ngo", email: "pnv2003@gmail.com", password: "123", admin: true, active: true)

# known users
User.create(fname: "Jameson", lname: "Kezzer", email: "jj@jj.jj", password: "jjj", admin: false, active: true)
u = User.create(fname: "Jackpot", lname: "Kattis", email: "kk@kk.kk", password: "kkk", admin: false, active: true)
100.times do
  post = u.posts.new(
    type: ['Photo', 'Album'].sample,
    title: Faker::Company.name,
    description: Faker::Quote.matz,
    mode: ['public', 'private'].sample
  )

  if post.type == "Photo"
    post.medium = Medium.new
  else
    Faker::Number.between(from: 1, to: 25).times do
      post.media.new
    end
  end
  post.save
end

# random users
Faker::Number.between(from: 10, to: 30).times do
  user = User.create(
    fname: Faker::Name.first_name,
    lname: Faker::Name.last_name,
    email: Faker::Internet.email,
    password: Faker::Internet.password,
    admin: false,
    active: [true, false].sample
  )

  Faker::Number.between(from: 1, to: 10).times do
    post = user.posts.new(
      type: ['Photo', 'Album'].sample,
      title: Faker::Company.name,
      description: Faker::Quote.matz,
      mode: ['public', 'private'].sample
    )

    if post.type == "Photo"
      post.medium = Medium.new
    else
      Faker::Number.between(from: 1, to: 25).times do
        post.media.new
      end
    end
    post.save
  end
end

# random follows
idx = 1
user_ids = User.ids
user_pairs = user_ids.product(user_ids)
user_pairs.each do |p|
  if p[0] != p[1] && [true, false].sample
    Follow.create(follower_id: p[0], followed_id: p[1])
    idx += 1
    break if idx == MAX_FOLLOW_COUNT
  end
end

# random reactions
idx = 1
post_ids = Post.ids
user_post_pairs = user_ids.product(post_ids)
user_post_pairs.each do |p|
  if [true, false].sample
    Reaction.create(user_id: p[0], post_id: p[1])
    idx += 1
    break if idx == MAX_REACT_COUNT
  end
end
