# Slack Post Action 

Github Action that handles the following:

1. Posts to Slack using a Webhook URL.

## Inputs

### `slack-webhook-url`

(Required) URL of the Slack webhook to send the message to.

## Example Usage

```yaml
name: Slack Post 

on:
  issues:
    types: [closed]

jobs:
  slack_post:
    runs-on: ubuntu-latest
    name: Post To Slack
    steps:
      - name: Post 
        id: post
        uses: loopsocial/slack-post-action@v1.0.0
        with:
          slack-webhook-url: ${{ secrets.SLACK_WEBHOOK_URL }}
```
