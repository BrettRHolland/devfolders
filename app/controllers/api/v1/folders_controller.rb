class Api::V1::FoldersController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_action :authenticate_user!
  
  def index
    @folders = Folder.where(user_id: current_user.id)
    @user = User.find(current_user.id)
    render json: {folders: @folders, user: @user}
  end

  private

  def board_params
    params.require(:folder).permit(:topic, :color)
  end
end