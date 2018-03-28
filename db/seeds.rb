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
f3 = Folder.create(user_id: u1.id, topic: 'React')

f4 = Folder.create(user_id: u2.id, topic: 'Rails')
f5 = Folder.create(user_id: u2.id, topic: 'Sinatra', color: 'green')