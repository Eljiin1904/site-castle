MakeSHELL=/bin/bash
GIT_TAG=$(TAG)

next-version:
	@.github/scripts/nextversion.sh

last-tag:
	@.github/scripts/lasttag.sh

gen-tag:
	@git tag $(GIT_TAG)
	@git push origin $(GIT_TAG) --tag

application-name:
	@.github/scripts/reponame.sh

