require 'faker'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

u1 = User.create(first_name: 'Jim', last_name: 'Smith', email: 'js@gmail.com', password: 'testpw')

databases = ['MySQL', 'PostgreSQL', 'Oracle Database', 'IBM DB2']
frameworks = ['Angular', 'Laravel', 'React', 'Ruby on Rails', 'Symfony']
others = ['Design', 'Grid', 'Color']

frameworks.each do |framework|
    Folder.create(
    user_id: 1,
    topic: framework,
    category: 'framework'
  )
end

7.times do |index|
  Folder.create(
    user_id: 1,
    topic: Faker::ProgrammingLanguage.name,
    category: 'language'
  )
end

databases.each do |database|
    Folder.create(
    user_id: 1,
    topic: database,
    category: 'database'
  )
end

others.each do |other|
    Folder.create(
    user_id: 1,
    topic: other,
    category: 'other'
  )
end


150.times do |index|
  Note.create(
    folder_id: rand(1..19),
    title: Faker::Book.title,
    content: Faker::Lorem.paragraph
  )
end

150.times do |index|
  Link.create(
    folder_id: rand(1..19),
    title: Faker::Company.name,
    content: Faker::Internet.url
  )
end