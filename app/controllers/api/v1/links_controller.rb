class Api::V1::LinksController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!

  def index
    @links = Link.where(folder_id: params[:folder_id])
    render json: {links: @links}
  end

  def show
  end

  def create
    @link = Link.new(link_params)

    if @link.save
      render json: { link: @link }
    end
  end

  def destroy
    @deleted_link = Link.find(params[:id])
    @deleted_link.destroy
    @links = Link.where(folder_id: params[:folder_id])
    render json: {links: @links}
  end

  private

  def link_params
    params.require(:link).permit(:folder_id, :title, :content)
  end
end
