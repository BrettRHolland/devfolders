class Folder < ApplicationRecord
	belongs_to :user
	has_many :notes
	has_many :videos
	has_many :snippets

	validates :user_id, presence: true
	validates :topic, presence: true
end
