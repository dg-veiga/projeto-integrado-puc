FROM python:3.11-alpine

WORKDIR /workspace

COPY . .

ENV VIRTUAL_ENV=venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"
RUN source $VIRTUAL_ENV/bin/activate

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

RUN python manage.py migrate
RUN python manage.py flush --noinput
RUN python manage.py shell < base_app/scripts/create_dummy_users.py

EXPOSE 8000

ENTRYPOINT ["sh", "docker-entrypoint.sh"]