class AlbumsController < ApplicationController
  layout "user"

  def new
    @album = Album.new
    @album.media.new
  end

  def create
    @album = Album.new(user_id: current_user.id, title: album_params[:title], mode: album_params[:mode], description: album_params[:description])

    if !@album.save
      redirect_to new_album_path, flash: {error: "Album creation failed: " + @album.errors.full_messages.join(",")}
      return
    end

    album_params[:media_attributes].each do |key, value|
      @album.media.new(url: value[:url])
    end

    if @album.save
      redirect_to user_path(session[:user_id], tab: "albums"), flash: {success: "Album created successfully"}
    else
      redirect_to new_album_path, flash: {error: "Album creation failed: " + @album.errors.full_messages.join(",")}
    end
  end

  def edit
    @album = Album.find(params[:id])
  end

  def update
  end

  private
  def album_params
    params.require(:album).permit(:title, :mode, :description, media_attributes: [:url, :_destroy])
  end
end
