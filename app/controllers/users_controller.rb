class UsersController < ApplicationController
  layout "user", only: [:show, :edit, :change_password]

  def show
    @user = User.find(params[:id])
    @photos = @user.posts.where(type: "Photo")
    @albums = @user.posts.where(type: "Album")
    @followers = @user.followers
    @followings = @user.followings

    if (params[:tab].present?)
      @tab = params[:tab]
    else
      @tab = "photos"
    end

    if (params[:notice].present?)
      render json: { status_code: 200, message: params[:notice] }, status: :ok
    end
  end

  def edit
    @user = User.find(params[:id])
  end

  def update # update avatar only (everything else is handled by users/registrations_controller)
    @user = User.find(params[:id])
    if @user.update(user_info_params)
      msg = "Profile updated!"
      flash[:notice] = msg
      render json: { status_code: 200, message: msg }, status: :ok
    else
      msg = "Failed to update profile: " + @user.errors.full_messages.join(", ")
      flash[:error] = msg
      render json: { status_code: 500, message: msg }, status: :internal_server_error
    end
  end

  private
  def user_info_params
    params.require(:user).permit(:avatar)
  end
end
