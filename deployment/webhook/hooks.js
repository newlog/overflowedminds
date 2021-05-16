[
  {
    "id": "update-overflowedminds",
    "execute-command": "/home/ubuntu/webhooks/commands/update-overflowedminds.sh",
    "pass-arguments-to-command": [
      {
        "source": "payload",
        "name": "repository.name"
      }
    ],
    "trigger-rule": {
      "and": [
        {
          "match":
          {
            "type": "payload-hash-sha1",
            "secret": "{{ getenv "GITHUB_SECRET" | js }}",
            "parameter":
            {
              "source": "header",
              "name": "X-Hub-Signature"
            }
          }
        },
        {
          "match":
          {
            "type": "value",
            "value": "refs/heads/master",
            "parameter":
            {
              "source": "payload",
              "name": "ref"
            }
          }
        },
        {
          "match":
          {
            "type": "value",
            "value": "tag",
            "parameter":
            {
              "source": "payload",
              "name": "ref_type"
            }
          }
        }
      ]
    }
  }
]