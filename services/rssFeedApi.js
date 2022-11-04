import * as rssParser from 'react-native-rss-parser';
import {rssFeedUrl} from '../package.json';

export function fetchFeed() {
  return fetch(rssFeedUrl)
    .then((response) => response.text())
    .then((responseData) => rssParser.parse(responseData))
    .then((rss) => {
      let rssFeedContent = '';

      rss.items.map((item) => {
        rssFeedContent += item.content;
      });

      return {
        content: rssFeedContent,
      };
    });
}
