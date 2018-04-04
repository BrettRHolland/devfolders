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
      render json: { video: @video }
    end
  end

  def destroy
    @deleted_video = Video.find(params[:id])
    @deleted_video.destroy
    @videos = Video.where(folder_id: params[:folder_id])
    render json: {videos: @videos}
  end

  private

  def video_params
    params.require(:video).permit(:folder_id, :title, :youtube)
  end
end
