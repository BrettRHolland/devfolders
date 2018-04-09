require 'faker'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
#   Video.create(folder_id: 1, title: 'Example', content: 'Example')

databases = ['MySQL', 'PostgreSQL', 'IBM DB2']
frameworks = ['Angular', 'React', 'Ruby on Rails']
others = ['Design', 'Grid', 'Color']

User.create(first_name: 'Jim', last_name: 'Smith', email: 'js@gmail.com', password: 'testpw')
Folder.create(user_id: 1, topic: 'JavaScript', category: 'language')

Note.create(folder_id: 1, title: 'Objects', content: 'Objects are class free, can contain other objects and can inherit properties from their prototypes (which can reduce object initialisatioin time and memory consumption).')
Note.create(folder_id: 1, title: 'Scope', content: 'In JavaScript, scope is kept within function, but not within blocks (such as while, if and for statement).')
Note.create(folder_id: 1, title: 'Closure', content: 'A closure is a Function instance coupled with the local variables from its environement that are ncessary for its exeuction.')
Note.create(folder_id: 1, title: 'Boolean', content: 'If Boolean object has no initial value, or if it is 0, -0, null, ””, false, undefined, or NaN, the object is set to False.')
Note.create(folder_id: 1, title: 'Comments', content: 'Always use // for comments, even multi-line ones to avoid having to escape /* characters.')
Note.create(folder_id: 1, title: 'Callbacks', content: 'A callback function is a function passed to another function as a parameter and executed in this other function.')
Note.create(folder_id: 1, title: 'Module', content: 'A module is a function or object whose contents can be used, but its state and implementation are hidden.')

Video.create(folder_id: 1, title: 'Promises in JavaScript', youtube: 's6SH72uAn3Q')
Video.create(folder_id: 1, title: 'Javascript Literals, Functions and Constructors', youtube: 'pKJG6u2kuFw')
Video.create(folder_id: 1, title: 'JavaScript Higher Order Functions & Arrays', youtube: 'rRgD1yVwIvE')

Link.create(folder_id: 1, title: 'JavaScript Reference', content: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference')
Link.create(folder_id: 1, title: 'JavaScript and HTML DOM Reference', content: 'https://www.w3schools.com/jsref/default.asp')
Link.create(folder_id: 1, title: 'Array.prototype.flatten()', content: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatten')
Link.create(folder_id: 1, title: 'Functions — reusable blocks of code', content: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Functions')

frameworks.each do |framework|
    Folder.create(
    user_id: 1,
    topic: framework,
    category: 'framework'
  )
end

4.times do |index|
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

60.times do |index|
  Note.create(
    folder_id: rand(2..10),
    title: Faker::Book.title,
    content: Faker::Lorem.paragraph
  )
end

60.times do |index|
  Link.create(
    folder_id: rand(2..10),
    title: Faker::Company.name,
    content: Faker::Internet.url
  )
end
