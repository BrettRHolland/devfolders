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
		@notes_count = Note.where(folder_id: @folder.id).count
		@snippets = Snippet.where(folder_id: @folder.id)
		@snippets_count = Snippet.where(folder_id: @folder.id).count
		@videos = Video.where(folder_id: @folder.id)
		@videos_count = Video.where(folder_id: @folder.id).count
		render json: {notes: @notes, snippets: @snippets, videos: @videos, notes_count: @notes_count, videos_count: @videos_count, snippets_count: @snippets_count}
	end

	def create
		@user = User.find(current_user.id)
		@folder = Folder.new(folder_params)
		@folder.user = @user

		if @folder.save
			render json: { folder: @folder }
		end

	end

	def destroy
		@user = User.find(current_user.id)
		@deleted_folder = Folder.find(params[:id])
		@deleted_folder.destroy
		@folders = Folder.where(user_id: current_user.id)
		@user = User.find(current_user.id)
		render json: {folders: @folders, user: @user}
	end

	private

	def folder_params
		params.require(:folder).permit(:topic, :color)
	end
end
