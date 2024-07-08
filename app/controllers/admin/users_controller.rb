class Admin::UsersController < ApplicationController
  before_action :authorized_as_admin
  layout "admin"

  def index
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
  end

  def destroy
  end
end
