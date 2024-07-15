class FollowsController < ApplicationController
  def create
    @follow = Follow.new(follow_params)
    if @follow.save
      render json: { status_code: 201, message: "Followed successfully" }, status: :created
    else
      render json: { status_code: 500, message: "Failed to follow: " + @follow.errors.full_messages.join(', ') }, status: :internal_server_error
    end
  end

  def destroy
    @follow = Follow.find_by(follower_id: follow_params[:follower_id], followed_id: follow_params[:followed_id])
    if @follow.destroy
      render json: { status_code: 200, message: "Unfollowed successfully" }, status: :ok
    else
      render json: { status_code: 500, message: "Failed to unfollow: " + @follow.errors.full_messages.join(', ') }, status: :internal_server_error
    end
  end

  private
  def follow_params
    params.require(:follow).permit(:follower_id, :followed_id)
  end
end
