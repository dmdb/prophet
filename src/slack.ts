import { WebClient } from '@slack/web-api';

const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);