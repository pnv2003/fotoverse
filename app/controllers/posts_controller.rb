class PostsController < ApplicationController
  layout "user"

  def discover
  end

  def feeds
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    render json: { status_code: 200, message: "Post deleted." }, status: :ok
  rescue StandardError => e
    render json: { status_code: 500, message: e.message }, status: :internal_server_error
  end
end
