class Admin::AlbumsController < ApplicationController
  before_action :authorize_admin
  layout "admin"

  def index
    @albums = Album.order(updated_at: :desc).page(params[:page]).per(16)
  end

  def edit
    @album = Album.find(params[:id])
  end

  def update
    @album = Album.find(params[:id])

    if !@album.update(title: album_params[:title], mode: album_params[:mode], description: album_params[:description])
      redirect_to edit_admin_album_path(@album), flash: {error: "Album update failed: " + @album.errors.full_messages.join(",")}
      return
    end

    album_params[:media_attributes].each do |key, value|
      if Integer(key) > @album.media.length - 1
        @album.media.new(url: value[:url])
      elsif value[:_destroy] == "true"
        @album.media[Integer(key)].destroy
      end
    end

    if @album.save
      redirect_to admin_albums_path, flash: {success: "Album updated successfully"}
    else
      redirect_to edit_admin_album_path(@album), flash: {error: "Album update failed: " + @album.errors.full_messages.join(",")}
    end
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    render json: { status_code: 200, message: "Post deleted." }, status: :ok
  rescue StandardError => e
    render json: { status_code: 500, message: e.message }, status: :internal_server_error
  end

  private
  def album_params
    params.require(:album).permit(:title, :mode, :description, media_attributes: [:url, :_destroy])
  end
end
