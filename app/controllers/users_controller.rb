class UsersController < ApplicationController
  skip_before_action :authorized, only: [:new, :create]
  layout "user", only: [:show, :edit, :change_password]

  def new
    @user = User.new
  end

  def create
    @user = User.new({**user_params, admin: false, active: true})
    if @user.save
      session[:user_id] = @user.id
      redirect_to "/welcome", flash: { notice: "You have become a member!" }
    else
      redirect_to "/signup", flash: { error: "Failed to sign up: " + @user.errors.full_messages.join(", ") }
    end
  end

  def show
    @user = User.find(params[:id])
  end

  def edit
    @user = User.find(params[:id])
  end

  def change_password
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_info_params)
      msg = "Profile updated!"
      flash[:notice] = msg
      render json: { status_code: 200, message: msg }, status: :ok
      # redirect_to user_path(@user), flash: { notice: "Profile updated!" }
    else
      msg = "Failed to update profile: " + @user.errors.full_messages.join(", ")
      flash[:error] = msg
      render json: { status_code: 500, message: msg }, status: :internal_server_error
      # redirect_to edit_user_path(@user), flash: { error: "Failed to update profile: " + @user.errors.full_messages.join(", ") }
    end
  end

  private
  def user_params
    params.require(:user).permit(:fname, :lname, :email, :password, :password_confirmation)
  end

  def user_info_params
    params.require(:user).permit(:avatar, :fname, :lname, :email)
  end
end
