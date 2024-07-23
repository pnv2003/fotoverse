# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = "1.0"

# Add additional assets to the asset load path.
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in the app/assets
# folder are already added.
Rails.application.config.assets.precompile += %w(
  application.js
  application.css

  admin_albums.js
  admin_photos.js
  admin_users.js
  change_password.js
  edit_album.js
  edit_photo.js
  edit_profile.js
  feeds.js
  flash.js
  login.js
  new_album.js
  new_photo.js
  profile.js
  signup.js
)
