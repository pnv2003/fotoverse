class PhotosController < ApplicationController
  layout "user"

  def new
    @photo = Photo.new
    @photo.build_medium
  end

  def create
    @photo = Photo.new(user_id: current_user.id, title: photo_params[:title], mode: photo_params[:mode], description: photo_params[:description])

    if !@photo.save
      redirect_to new_photo_path, flash: {error: "Photo creation failed: " + @photo.errors.full_messages.join(",")}
      return
    end

    @photo.medium = Medium.new(url: photo_params[:medium_attributes][:url])

    if @photo.save
      redirect_to root_path, flash: {success: "Photo created successfully"}
    else
      redirect_to new_photo_path, flash: {error: "Photo creation failed: " + @photo.errors.full_messages.join(",")}
    end
  end

  def edit
    @photo = Photo.find(params[:id])
  end

  def update
  end

  private
  def photo_params
    params.require(:photo).permit(:title, :mode, :description, medium_attributes: [:url, :_destroy])
  end
end
