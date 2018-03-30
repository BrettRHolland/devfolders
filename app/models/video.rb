class Video < ApplicationRecord
  belongs_to :folder

  validates :title, presence: true
	validates :youtube, presence: true
end
