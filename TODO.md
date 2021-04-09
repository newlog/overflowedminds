
2. Enable local development/debugging with TLS
    - https://marmelab.com/blog/2019/01/23/https-in-development.html
3. Implement CI/CD via GitHub Actions
3. Monitor containers and restart as needed
    - https://mattsegal.dev/simple-django-deployment-4.html (not focused on containers)
4. Scale/Load balance requests to backend (multiple gunicorn workers & traefik load balancing)
    - https://mattsegal.dev/simple-django-deployment-4.html
    - 
5. Document the whole architecture
6. Instrument (manage logs, papertrail, sentry, new relic, datadog)
7. Implement & Test recovery plan (backups, restore backups)
8. Serve FE via cloudfront CDN
    - https://medium.com/dailyjs/a-guide-to-deploying-your-react-app-with-aws-s3-including-https-a-custom-domain-a-cdn-and-58245251f081

References:
- nginx config
    - https://mattsegal.dev/nginx-django-reverse-proxy-config.html
    