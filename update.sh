#!/bin/bash

# Pull the latest changes from GitHub
git pull origin main

# Install any new dependencies
npm install

# Restart the bot
pm2 restart bot