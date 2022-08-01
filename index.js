const github = require('@actions/github')
const core = require('@actions/core')
const axios = require('axios')

/**
 * Gets the input from the used action.
 * @param {string} key Input key to fetch
 * @returns {string} Returns the value of the input
 */
const getInput = (key) => {
  const input = core.getInput(key)
  if (!input) throw Error(`Input "${key}" was not defined`)
  return input
}

/**
 * Posts to Slack via webhook.
 * @param {object} body Body to post to Slack
 */
 const postToSlack = async (body) => {
  const webhookUrl = getInput('slack-webhook-url')
  await axios.post(webhookUrl, body)
}

/**
 * Constructs the Slack message JSON payload.
 * @param {string} header Slack message header
 * @param {string} body Slack message body
 */
const constructSlackMessage = (header, body) => {
  return {
    "blocks": [
      {
        "type": "header",
        "text": {
          "type": "plain_text",
          "text": header
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": body
        }
      }
    ]
  }
}

const run = async () => {
  try {
    // Get inputs
    const messageHeader = getInput('slack-message-header')
    const messageBody = getInput('slack-message-body')

    // Construct the message payload
    const message = constructSlackMessage(messageHeader, messageBody)

    // Post to Slack
    await postToSlack(message)
  } catch (error) {
    core.setFailed(error.message)
  }
}
run()
