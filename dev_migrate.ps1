rm tmp/db.sqlite3
node ace build
node ace migration:run
node ace db:seed --files=database\seeders\User
node ace db:seed --files=database\seeders\Club
node ace db:seed --files=database\seeders\Announcement
