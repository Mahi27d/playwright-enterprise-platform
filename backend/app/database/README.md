Minimum database (current)

This folder contains the minimal SQLAlchemy-based database used by the EPAP prototype. The current schema (created in `epap.db`) includes the following tables:

- users
  - username
  - email
  - password
  - role
  - is_active

- agents
  - name
  - website
  - category
  - enabled
  - schedule

- schedules
  - cron
  - enabled

- executions
  - agent_id
  - status
  - started_at
  - ended_at
  - records

Roadmap (planned tables)

As the project grows we'll add tables to support versioning, richer execution history, workflows, and integrations. Planned additions include:

- roles
- permissions
- agent_versions
- agent_selectors
- agent_variables
- agent_headers
- agent_cookies
- execution_logs
- execution_errors
- execution_screenshots
- execution_html
- downloads
- download_history
- notifications
- reports
- system_settings
- proxies
- browser_profiles
- workflows
- workflow_steps
- api_keys
- audit_logs

Migrations

We recommend using Alembic to manage schema changes. To initialize Alembic and create an initial migration:

```bash
cd backend
source .venv/bin/activate
alembic init alembic
# then edit alembic/env.py to point to your SQLAlchemy `engine` or import your `DATABASE_URL`
alembic revision --autogenerate -m "initial schema"
alembic upgrade head
```

If you want, I can scaffold Alembic configuration and an initial migration now.
