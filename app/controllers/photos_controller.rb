class PhotosController < ApplicationController
  before_action :authorized_as_admin, only: :all
  layout "user"

  def new
    @photo = Photo.new
  end

  def create
  end

  def edit
  end

  def update
  end

  def all
  end
end
