class Api::V1::VideosController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!

  def index
    @videos = Video.where(folder_id: params[:folder_id])
    render json: {videos: @videos}
  end

  def show
  end

  def create
    @video = Video.new(video_params)

    if @video.save
      @folder = Folder.find(params[:folder_id])
      @videos_count = Video.where(folder_id: @folder.id).count
      render json: {video: @video, videos_count: @videos_count}
    end
  end

  def destroy
    @deleted_video = Video.find(params[:id])
    @deleted_video.destroy
    @folder = Folder.find(params[:folder_id])
    @videos = Video.where(folder_id: @folder.id)
    @videos_count = Video.where(folder_id: @folder.id).count
    render json: {videos: @videos, videos_count: @videos_count}
  end

  private

  def video_params
    params.require(:video).permit(:folder_id, :title, :youtube)
  end
end
