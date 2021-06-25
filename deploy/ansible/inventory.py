#!/usr/bin/env python
import os

from digitalocean_inventory import fetch

if __name__ == "__main__":
    os.environ.setdefault("DO_ENV", "prod")
    os.environ.setdefault("DO_PROJECT", "calculator")
    os.environ.setdefault("DO_SSH_DIR", "~/.ssh/calculator")
    os.environ.setdefault("ANSIBLE_SSH_RETRIES", 5)
    inventory = fetch(stdout=False)
    print(inventory)
