class Api::V1::NotesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!

  def index
    @notes = Note.where(folder_id: params[:folder_id])
    render json: {notes: @notes}
  end

  def show
  end

  def create
    @note = Note.new(note_params)

    if @note.save
      render json: { note: @note }
    end
  end

  def destroy
    @deleted_note = Note.find(params[:id])
    @deleted_note.destroy
    @notes = Note.where(folder_id: params[:folder_id])
    render json: {notes: @notes}
  end

  private

  def note_params
    params.require(:note).permit(:folder_id, :title, :content)
  end
end
