update_blog:
	rsync -avu --delete ../freeworld/blog/public/ ./blog
	git add .
	git commit -m "updating blog"
	git push

update_demo:
	cp ../freeworld/assets/bundle.main.js .
	cp ../freeworld/assets/index.html .
	cp ../freeworld/assets/minimal.js .
	cp ../freeworld/assets/minimal.html .
	git add .
	git commit -m "updating demo"
	git push
