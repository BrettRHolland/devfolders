class Api::V1::FoldersController < ApplicationController
	protect_from_forgery unless: -> { request.format.json? }
	before_action :authenticate_user!

	def index
		@folders = Folder.where(user_id: current_user.id)
		@language_count = Folder.where(category: 'language').count
		@framework_count = Folder.where(category: 'framework').count
		@database_count = Folder.where(category: 'database').count
		@other_count = Folder.where(category: 'other').count
		@user = User.find(current_user.id)
		render json: {folders: @folders, language_count: @language_count, framework_count: @framework_count, database_count: @database_count, other_count: @other_count}
	end

	def show
		@folder = Folder.find(params[:id])
		@notes = Note.where(folder_id: @folder.id)
		@notes_count = Note.where(folder_id: @folder.id).count
		@snippets = Snippet.where(folder_id: @folder.id)
		@snippets_count = Snippet.where(folder_id: @folder.id).count
		@videos = Video.where(folder_id: @folder.id)
		@videos_count = Video.where(folder_id: @folder.id).count
		@links = Link.where(folder_id: @folder.id)
		@links_count = Link.where(folder_id: @folder.id).count
		render json: {notes: @notes, snippets: @snippets, videos: @videos, links: @links, notes_count: @notes_count, videos_count: @videos_count, snippets_count: @snippets_count, links_count: @links_count}
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
		@language_count = Folder.where(category: 'language').count
		@framework_count = Folder.where(category: 'framework').count
		@database_count = Folder.where(category: 'database').count
		@other_count = Folder.where(category: 'other').count
		render json: {folders: @folders, language_count: @language_count, framework_count: @framework_count, database_count: @database_count, other_count: @other_count}
	end

	private

	def folder_params
		params.require(:folder).permit(:topic, :category)
	end
end
