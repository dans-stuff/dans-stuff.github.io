update:
	cp ../freeworld/assets/bundle.main.js .
	cp ../freeworld/assets/index.html .
	cp ../freeworld/assets/minimal.js .
	cp ../freeworld/assets/minimal.html .
	git add .
	git commit -m "updating bundle"
	git push
