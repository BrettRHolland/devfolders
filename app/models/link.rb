class Link < ApplicationRecord
	belongs_to :folder

	validates :title, presence: true
	validates :content, presence: true
end
