Rails.application.routes.draw do
  devise_for :users
  root 'folders#index'

  resources :users
  resources :folders do
    resources :notes
    resources :snippets
    resources :videos
  end



  namespace :api do
    namespace :v1 do
      resources :folders do
        resources :videos
        resources :notes
        resources :snippets
      end
    end
  end
end
