[
  {
    "id": "simple-pull",
    "execute-command": "/home/ubuntu/webhook/commands/update-overflowedminds.sh",
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