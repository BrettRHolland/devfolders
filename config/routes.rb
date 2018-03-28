Rails.application.routes.draw do
	devise_for :users
	root 'folders#index'

	resources :users
	resources :folders

	namespace :api do
		namespace :v1 do
			resources :folders
		end
	end
end
