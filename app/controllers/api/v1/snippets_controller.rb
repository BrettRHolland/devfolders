class Api::V1::SnippetsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!

  def index
    @snippets = Snippet.where(folder_id: params[:folder_id])
    render json: {snippets: @snippets}
  end

  def show
  end

  def create
    @snippet = Snippet.new(snippet_params)

    if @snippet.save
      render json: { snippet: @snippet }
    end
  end

  def destroy
    @deleted_snippet = Snippet.find(params[:id])
    @deleted_snippet.destroy
    @snippets = Snippet.where(folder_id: params[:folder_id])
    render json: {snippets: @snippets}
  end

  private

  def snippet_params
    params.require(:snippet).permit(:folder_id, :title, :content)
  end
end
