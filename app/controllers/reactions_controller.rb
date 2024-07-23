class ReactionsController < ApplicationController
  def create
    @reaction = Reaction.new(reaction_params)
    if @reaction.save
      render json: { status_code: 201, message: "Reacted successfully" }, status: :created
    else
      render json: { status_code: 500, message: "Failed to react: " + @reaction.errors.full_messages.join(', ') }, status: :internal_server_error
    end
  end

  def destroy
    @reaction = Reaction.find_by(user_id: reaction_params[:user_id], post_id: reaction_params[:post_id])
    if @reaction.destroy
      render json: { status_code: 200, message: "Unreacted successfully" }, status: :ok
    else
      render json: { status_code: 500, message: "Failed to unreact: " + @reaction.errors.full_messages.join(', ') }, status: :internal_server_error
    end
  end

  private
  def reaction_params
    params.require(:reaction).permit(:user_id, :post_id)
  end
end
