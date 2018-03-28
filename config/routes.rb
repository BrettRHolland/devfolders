Rails.application.routes.draw do
	devise_for :users
	root 'folders#index'

	resources :users do
		resources :folders
	end

	namespace :api do
		namespace :v1 do
			resources :folders
		end
	end
end
