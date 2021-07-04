Pending:
* Enable local development/debugging with TLS
    - https://marmelab.com/blog/2019/01/23/https-in-development.html
* Make sure dev & prod set ups are as close as possible
   - Local deployment should use traefik too
* Create cookiecutter for app
* Use RDS or AuroraDB for prod instead of postgres container
* Monitor containers and restart as needed
    - https://mattsegal.dev/simple-django-deployment-4.html (not focused on containers)
* Scale/Load balance requests to backend (multiple gunicorn workers & traefik load balancing)
    - https://mattsegal.dev/simple-django-deployment-4.html
* Instrument (manage logs, papertrail, sentry, new relic, datadog)
* Implement & Test recovery plan (backups, restore backups)
+ Serve FE via cloudfront CDN to avoid 404
    - https://medium.com/dailyjs/a-guide-to-deploying-your-react-app-with-aws-s3-including-https-a-custom-domain-a-cdn-and-58245251f081

Done:
* Document the whole architecture
* Implement CI/CD via GitHub Actions

References:
* nginx config
    - https://mattsegal.dev/nginx-django-reverse-proxy-config.html