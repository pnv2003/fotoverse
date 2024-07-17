class Admin::PhotosController < ApplicationController
  before_action :authorize_admin
  layout "admin"

  def index
    @photos = Photo.all
  end

  def edit
    @photo = Photo.find(params[:id])
  end

  def update
    @photo = Photo.find(params[:id])

    photo_parameters = photo_params
    if photo_params[:medium_attributes][:url] != nil
      @photo.medium.destroy
    else
      photo_parameters.delete(:medium_attributes)
    end

    if @photo.update(photo_parameters)
      redirect_to user_path(current_user.id, tab: "photos"), flash: {success: "Photo updated successfully"}
    else
      redirect_to edit_photo_path(@photo), flash: {error: "Photo update failed: " + @photo.errors.full_messages.join(",")}
    end
  end

  def destroy
  end

  private
  def photo_params
    params.require(:photo).permit(:title, :mode, :description, medium_attributes: [:url, :_destroy])
  end
end
