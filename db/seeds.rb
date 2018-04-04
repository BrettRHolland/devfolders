require 'faker'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

u1 = User.create(first_name: 'Brett', last_name: 'Holland', email: 'brett.holland@gmail.com', password: 'testpw')
u2 = User.create(first_name: 'Jim', last_name: 'Smith', email: 'brett.holland+jim@gmail.com', password: 'testpw')

f1 = Folder.create(user_id: u1.id, topic: 'Ruby', color: 'red')
f2 = Folder.create(user_id: u1.id, topic: 'JavaScript', color: 'blue')
f3 = Folder.create(user_id: u1.id, topic: 'React', color: 'blue')

f4 = Folder.create(user_id: u2.id, topic: 'Rails', color: 'red')
f5 = Folder.create(user_id: u2.id, topic: 'Sinatra', color: 'red')

f6 = Folder.create(user_id: u1.id, topic: 'Sinatra', color: 'red')
f7 = Folder.create(user_id: u1.id, topic: 'Postgres', color: 'blue')
f8 = Folder.create(user_id: u1.id, topic: 'Search Algorithms', color: 'gray')

v1 = Video.create(folder_id: f1.id, title: Faker::Book.title, youtube: 'FBxVN7U1Qsk')
v1 = Video.create(folder_id: f1.id, title: Faker::Book.title, youtube: 'aiXNKHKWlmY')
v1 = Video.create(folder_id: f1.id, title: Faker::Book.title, youtube: 'MJUJ4wbFm_A')

s1 = Snippet.create(folder_id: f1.id, title: 'Test Snippet', content: "<html><p>test</p></html>")

5.times do |index|
  Note.create(
    folder_id: f2.id,
    title: Faker::Book.title,
    content: Faker::Lorem.paragraph
  )
end

5.times do |index|
  Note.create(
    folder_id: f1.id,
    title: Faker::Book.title,
    content: Faker::Lorem.paragraph
  )
end
