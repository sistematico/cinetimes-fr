 // Strict mode.
 "use strict";

 const path = require("path");
 const querystring = require("querystring");
 

hexo.extend.tag.register('clickToTweet', (args) => {
    let quote = args[0];
    let permalink = args[1];
    let hashtags = args[2]

    let URLData = {};
    URLData.text = quote;
    if(hexo.config.twitter_site) {
        URLData.via = hexo.config.twitter_site;
        URLData.related = hexo.config.twitter_site;
    }
    if(hashtags) {
        URLData.hashtags = hashtags;
    }
    if(permalink) {
        URLData.url = permalink;
    }

    let tweetURL = "https://twitter.com/intent/tweet?"+querystring.stringify(URLData);

    return `<div class="tweet-container">  <a href="${tweetURL}" target="_blank" rel="external nofollow noopener noreferrer">  <p>${quote}</p>  <div class="click-to-tweet"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><path d="M24.253 8.756C24.69 17.08 18.297 24.182 9.97 24.62a15.093 15.093 0 0 1-8.86-2.32c2.702.18 5.375-.648 7.507-2.32a5.417 5.417 0 0 1-4.49-3.64c.802.13 1.62.077 2.4-.154a5.416 5.416 0 0 1-4.412-5.11 5.43 5.43 0 0 0 2.168.387A5.416 5.416 0 0 1 2.89 4.498a15.09 15.09 0 0 0 10.913 5.573 5.185 5.185 0 0 1 3.434-6.48 5.18 5.18 0 0 1 5.546 1.682 9.076 9.076 0 0 0 3.33-1.317 5.038 5.038 0 0 1-2.4 2.942 9.068 9.068 0 0 0 3.02-.85 5.05 5.05 0 0 1-2.48 2.71z"/></svg><span class="tweet-btn">Cliquez pour Tweeter</span></div></a></div>`
},{async: true});