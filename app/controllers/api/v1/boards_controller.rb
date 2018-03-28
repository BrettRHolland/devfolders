class Api::V1::BoardsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_action :authenticate_user!
  
  def index
    @boards = Board.where(user_id: current_user.id)
    @user = User.find(current_user.id)
    render json: {boards: @boards, user: @user}
  end

  private

  def board_params
    params.require(:board).permit(:topic, :color)
  end
end