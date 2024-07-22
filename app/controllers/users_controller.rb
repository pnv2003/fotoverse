class UsersController < ApplicationController
  layout "user", only: [:show, :edit, :change_password]

  def show
    @user = User.find(params[:id])

    if (params[:content].present?)
      # lazy load
      tab = params[:content]
      if (tab == "photos")
        photos = @user.posts.where(type: "Photo").page(params[:page]).per(16)
        render json: photos, include: { medium: { only: :url }, reactors: { only: :id } }

      elsif (tab == "albums")
        albums = @user.posts.where(type: "Album").page(params[:page]).per(16)
        render json: albums, include: { media: { only: :url }, reactors: { only: :id } }

      elsif (tab == "followers")
        followers = @user.followers.page(params[:page]).per(16)
        render json: followers, include: { posts: { only: [:id, :type] }, followers: { only: :id } }

      elsif (tab == "following")
        followings = @user.followings.page(params[:page]).per(16)
        render json: followings

      end
      return
    end

    # initil load
    @photos = @user.posts.where(type: "Photo").page(params[:page]).per(16)
    @albums = @user.posts.where(type: "Album").page(params[:page]).per(16)
    @followers = @user.followers.page(params[:page]).per(16)
    @followings = @user.followings.page(params[:page]).per(16)

    if (params[:tab].present?)
      @tab = params[:tab]
    else
      @tab = "photos"
    end

    if (params[:notice].present?)
      render json: { status_code: 200, message: params[:notice] }, status: :ok
    end
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
