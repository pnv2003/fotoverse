# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

def getfile(url)
  stream = URI.open(url)
  return stream if stream.respond_to?(:path)

  Tempfile.new.tap do |file|
    file.binmode
    IO.copy_stream(stream, file)
    stream.close
    file.rewind
  end
end

# admin
User.create(fname: "Phuong", lname: "Ngo", email: "pnv2003@gmail.com", password: "123", avatar: getfile(Faker::Avatar.image), admin: true, active: true, confirmed_at: Time.now)

puts "Done: admin"

# known users
User.create(fname: "Jameson", lname: "Kezzer", email: "jj@jj.jj", password: "jjj", avatar: getfile(Faker::Avatar.image), admin: false, active: true, confirmed_at: Time.now)
u = User.create(fname: "Jackpot", lname: "Kattis", email: "kk@kk.kk", password: "kkk", avatar: getfile(Faker::Avatar.image), admin: false, active: true, confirmed_at: Time.now)
20.times do
  post = u.posts.create(
    type: ['Photo', 'Album'].sample,
    title: Faker::Company.name,
    description: Faker::Quote.matz,
    mode: ['public', 'private'].sample
  )

  if post.type == "Photo"
    post.medium = Medium.new(url: getfile(Faker::LoremFlickr.image))
  else
    Faker::Number.between(from: 1, to: 25).times do
      post.media.new(url: getfile(Faker::LoremFlickr.image))
    end
  end
  post.save
  u.save
end

puts "Done: known users"

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
    post = user.posts.create(
      type: ['Photo', 'Album'].sample,
      title: Faker::Company.name,
      description: Faker::Quote.matz,
      mode: ['public', 'private'].sample
    )

    if post.type == "Photo"
      post.medium = Medium.new(url: getfile(Faker::LoremFlickr.image))
    else
      Faker::Number.between(from: 1, to: 25).times do
        post.media.new(url: getfile(Faker::LoremFlickr.image))
      end
    end
    post.save
  end
end

puts "Done: random users"

# random follows
Faker::Number.between(from: 100, to: 200).times do
  user_id_1 = User.ids.sample
  user_id_2 = User.ids.sample
  if user_id_1 != user_id_2
    Follow.create(follower_id: user_id_1, followed_id: user_id_2)
  end
end

puts "Done: follows"

# random reactions
Faker::Number.between(from: 100, to: 200).times do
  user_id = User.ids.sample
  post_id = Post.ids.sample
  Reaction.create(user_id: user_id, post_id: post_id)
end

puts "Done: reactions"
