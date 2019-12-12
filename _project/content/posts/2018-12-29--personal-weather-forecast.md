---
title: Personal Weather Forecast
date: 2018-12-29
---

# Personal Weather Forecast

tl;dr Personal Weather Forecast is a small JavaScript program that mashes together Dark Sky's API with Twilio's APIs to produce a personally tailored weather forecast and sends it to you as a text message every morning. The source code is available as [a project on GitHub, here][github-project].

![Screenshot of an example notification][notification-screenshot]

If you want to receive your own personal weather forecast every morning...

- check out the repository to a computer you'll leave switched on—such as a DigitalOcean droplet, or a Raspberry Pi home server
- create a script similar to the one below
- save it somewhere accessible from your logged-in user on your server, such as `~/bin/forecast-sms`.

```sh
#!/bin/sh

export DARKSKY_KEY=[your-darksky-key]
export DARKSKY_LATLONG=[the-location-for-the-forecast]
export TWILIO_ACCOUNT=[your-twilio-account-sid]
export TWILIO_TOKEN=[your-twilio-auth-token]
export TWILIO_FROM=[your-twilio-phone-number]
export TWILIO_TO=[your-destination-phone-number]

pushd /[repo-location]/personal-weather-forecast >/dev/null
node main.js
popd >/dev/null
```

To make it run every morning, you should edit your user's crontab which with the following command...

```sh
$ crontab -e
```

...and add the following line...

```
0 7 * * 1-5 ~/bin/forecast-sms
```

...which references the location of the previously saved script. This cron entry means that every Monday to Friday morning at 7am you'll receive your very own personal weather forecast!

![Screenshot of an example message][message-screenshot]

## Discussion

If you want to leave a comment or discuss this post, please reply to my tweet below!

[@MikeCoatsDotCom/1052832221684477952][discussion-tweet]

[github-project]: https://github.com/MikeCoats/personal-weather-forecast
[notification-screenshot]: notification.jpg
[message-screenshot]: message.jpg
[discussion-tweet]: https://twitter.com/MikeCoatsDotCom/status/1052832221684477952
