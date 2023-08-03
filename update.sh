#!/bin/bash

# Save files temporary

git stash

# Delete old "cache"

git reset --hard origin/main

# Pull the latest changes from GitHub
git pull origin main

# Install any new dependencies
npm install

# Restart the bot
pm2 restart main.js