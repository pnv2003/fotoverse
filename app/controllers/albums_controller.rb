class AlbumsController < ApplicationController
  layout "user"

  def new
    Rails.logger.debug "HELLOOOOOOOOOOOOOOOO AlbumsController#new"
    @album = Album.new
    @album.media.build
  end

  def create
    Rails.logger.debug "HELOOOOOOOOOOOOOOOOOO AlbumsController#create"
    @album = Album.new(album_params)
    if @album.save
      # logger.debug "Album created successfully."
      # redirect_to root_path, flash: { notice: "Album created successfully." }
    else
      # logger.debug @album.errors.full_messages.join(", ")
      # redirect_to new_album_path, flash: { error: "Album creation failed: " + @album.errors.full_messages.join(", ")}
    end
  end

  def edit
    @album = Album.find(params[:id])
  end

  def update
  end

  private
  def album_params
    params.require(:album).permit(:title, :description, media_attribute: [:url, :_destroy])
  end
end
