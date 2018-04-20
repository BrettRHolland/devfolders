class FoldersController < ApplicationController
	before_action :authenticate_user!, except: [:index]
	def index
		if user_signed_in?
			@user = current_user
		else
			redirect_to new_user_session_path
		end
	end
	def show
		@user = current_user
	end
end
