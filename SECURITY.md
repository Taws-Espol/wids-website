# Security Policy

## Reporting a vulnerability

Please report security vulnerabilities privately, through GitHub:

1. Go to the [Security tab](https://github.com/Taws-Espol/wids-website/security) of this repository
2. Choose **Report a vulnerability**
3. Describe the issue, the impact, and how to reproduce it

**Do not open a public issue for a security problem.** Public issues are visible to everyone, including before a fix exists.

You can expect an initial response within a week. If the report is confirmed we will agree a disclosure timeline with you before publishing anything.

## Scope

This repository is the WiDS Guayaquil website. Reports we are particularly interested in:

- Access to registration data — attendee names, emails, national IDs and phone numbers are stored in this system
- Flaws in the attendance token flow that would let someone confirm attendance for another person
- Authentication or authorisation gaps in the Payload admin panel
- Anything allowing writes to published content

Out of scope: findings against `widsworldwide.org` or any other WiDS chapter, which are separate projects and should go to their own maintainers.
