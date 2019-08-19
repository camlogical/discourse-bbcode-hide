discourse-bbcode-hide
======================

A Discourse Plugin to support BBCode hide tags.

Usage
=====

In your posts, surround text with `[hide=...]` and `[/hide]`. hide values are those supported by HTML, like `guest` and `group`. For example:

```
Look at my [hide=guest]Hide content for guest words[/hide] and be amazed!

```

Installation
============

* Add the plugin's repo url to your container's yml config file

```yml
hooks:
  after_code:
    - exec:
        cd: $home/plugins
        cmd:
          - mkdir -p plugins
          - git clone https://github.com/discourse/docker_manager.git
          - git clone https://github.com/tohaitrieu/discourse-bbcode-hide.git
```

* Rebuild the container

```shell
cd /var/discourse
git pull
./launcher rebuild app
```

* Re-render all posts now that the plugin is installed. This won't create any extra revisions.

```shell
rake posts:rebake
```

License
=======

MIT
