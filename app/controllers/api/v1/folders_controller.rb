class Api::V1::FoldersController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_action :authenticate_user!

  def index
    @folders = Folder.where(user_id: current_user.id)
    @user = User.find(current_user.id)
    render json: {folders: @folders, user: @user}
  end

  def show
    @folder = Folder.find(params[:id])
    @notes = Note.where(folder_id: @folder.id)
    @snippets = Snippet.where(folder_id: @folder.id)
    @videos = Video.where(folder_id: @folder.id)
    render json: {notes: @notes, snippets: @snippets, videos: @videos}
  end

  def create
    @user = User.find(current_user.id)
    @folder = Folder.new(folder_params)
    @folder.user = @user

    if @folder.save
      render json: { folder: @folder }
    end

  end

  private

  def folder_params
    params.require(:folder).permit(:topic, :color)
  end
end
