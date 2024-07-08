class Admin::PhotosController < ApplicationController
  before_action :authorized_as_admin
  layout "admin"

  def index
  end

  def edit
    @photo = Photo.find(params[:id])
  end

  def update
  end

  def destroy
  end
end
