class Admin::UsersController < ApplicationController
  before_action :authorize_admin
  layout "admin"

  def index
    @users = User.where(admin: false).order(:fname).page(params[:page]).per(15)
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    user_params = user_info_params

    if user_params[:password] != user_params[:password_confirmation]
      msg = "Failed to update user: Password does not match"
      flash[:error] = msg
      render json: { status_code: 400, message: msg }, status: :bad_request
      return
    end

    if user_params[:password] == ""
      user_params.delete(:password)
      user_params.delete(:password_confirmation)
    end

    @user = User.find(params[:id])
    if @user.update(user_params)
      msg = "User updated!"
      flash[:notice] = msg
      render json: { status_code: 200, message: msg }, status: :ok
    else
      msg = "Failed to update user: " + @user.errors.full_messages.join(", ")
      flash[:error] = msg
      render json: { status_code: 500, message: msg }, status: :internal_server_error
    end
  end

  def destroy
  end

  private
  def user_info_params
    params.require(:user).permit(:avatar, :fname, :lname, :email, :password, :password_confirmation)
  end
end
