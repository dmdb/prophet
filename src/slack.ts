import { WebClient } from '@slack/web-api';

const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

const postMessage = async (text: string, channel: string) => {
  try {
    await web.chat.postMessage({ channel, text });
  } catch (e) {
    console.error('Slack API error');
    console.error(e);
  }
};

export { postMessage };