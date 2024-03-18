
# AWB Tracker

![GitHub License](https://img.shields.io/github/license/dekolor/awb_tracker)
[![GitHub Stars](https://img.shields.io/github/stars/dekolor/awb_tracker)](https://github.com/dekolor/awb_tracker/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/dekolor/awb_tracker)](https://github.com/dekolor/awb_tracker/network/members)
[![GitHub Issues](https://img.shields.io/github/issues/dekolor/awb_tracker)](https://github.com/dekolor/awb_tracker/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/dekolor/awb_tracker)](https://github.com/dekolor/awb_tracker/pulls)
[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/dekolor/awb_tracker/laravel.yml)](https://github.com/dekolor/awb_tracker/pulls)

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)

## Introduction

AWB Tracker is a postal package tracking app that serves as a dashboard which shows in detail the status of every awb.

![Dashboard](/images/demo1.png)
![AWB Details](/images/demo2.png)

## Features

- **AWB location**: Check the location of your package in every step of the delivery process.
- **Delivery status**: See every step in the process: from AWB registration to 'on-the-way' messages.
- **Notifications**: You will be notified of every status change in the delivery.
- **Runs in the background**: The app will check every five minutes for any status change on every AWB stored in the DB.

## Installation

To start using Equine Tracker, follow these installation steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/dekolor/awb_tracker.git
   ```

2. Navigate to the project directory:

   ```bash
   cd awb_tracker
   ```
3. Install composer packages:

   ```bash
   composer install
   ```

4. Install the required dependencies:

   ```bash
   npm install
   ```

5. Compile assets in the development environment

   ```bash
   npm run dev
   ```

6. Run the migrations & seed the database:

   ```bash
   php artisan migrate:fresh --seed
   ```

7. Run the scheduler worker:

   ```bash
   php artisan schedule:work
   ```

8. Run the application:

   ```bash
   php artisan serve
   ```

Now you should see the app running on [127.0.0.1:8000](http://127.0.0.1:8000).

