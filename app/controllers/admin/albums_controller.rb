class Admin::AlbumsController < ApplicationController
  before_action :authorized_as_admin
  layout "admin"

  def index
  end

  def edit
  end

  def update
  end

  def destroy
  end
end
