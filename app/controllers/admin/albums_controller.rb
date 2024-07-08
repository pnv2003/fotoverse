class Admin::AlbumsController < ApplicationController
  before_action :authorized_as_admin
  layout "admin"

  def index
  end

  def edit
    @album = Album.find(params[:id])
  end

  def update
  end

  def destroy
  end
end
