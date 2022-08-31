# Mars Dashboard App

## Table of Contents

- [Description](#description "Description")
- [App Functionality](#app-functionality "App Functionality")
- [Installation](#installation "Installation")
- [Trying the App](#trying-the-app "Trying the App")

## Description

This is a Mars rover dashboard consumes the NASA API. This dashboard allows the user to select which rover's information they want to view. Once they have selected a rover, it is able to see the most recent images taken by that rover, as well as important information about the rover and its mission. This app is based in javascritp functional programming using some pure functions and iterating over, reshaping, and accessing information from complex API responses.

This app is built with Node/Express makimg calls to the NASA API.

This app is responsive for adapting to different device's size.

## App Functionality

![Funcionality](/screenshots/MarsDasboard.gif)

## Installation

`yarn install`

## Trying the app

1. You need a NASA developer API key in order to access the API endpoints. To do that, go here: https://api.nasa.gov/. If you want to simply look around at what api endpoints NASA offers, you can use their provided DEMO_KEY to do this.

2. In the .env file enter your API key.

3. Run `yarn start` in your terminal and go to `http:localhost:3000` to enjoy the app.
