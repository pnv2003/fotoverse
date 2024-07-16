class Admin::AlbumsController < ApplicationController
  before_action :authorize_admin
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
