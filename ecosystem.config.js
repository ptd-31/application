module.exports = {
  apps : [{
    name: 'my-app',
    script: 'app.js',
    instance_var: 'INSTANCE_ID',
    exec_mode: 'fork',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      LOGLEVEL: 'debug',
      HTTP_PORT: 3000,
      JAMBONZ_ACCOUNT_SID: '9351f46a-678c-43f5-b8a6-d4eb58d131af',
      //JAMBONZ_API_KEY: 'b82c3332-629a-4a41-9f1d-b4ee7c8f8a86',
      JAMBONZ_API_KEY: '25edb112-88f0-4e36-8def-17f49dcf3bb9',
      JAMBONZ_REST_API_BASE_URL: 'https://jambonz.us',
      WEBHOOK_SECRET: 'wh_secret_cJqgtMDPzDhhnjmaJH6Mtk',
      //GOOGLE_APPLICATION_CREDENTIALS: 'credentials/bot-ccall-9vhv-cc444ad5d427.json',
      AUTH_CREDENTIALS: 'credentials/credentials.json',
      //DIALOGFLOW_PROJECT_ID: 'bot-ccall-9vhv',
      DIALOGFLOW_WELCOME_INTENT: 'Welcome',
      //OUTBOUND_CALLER_ID: '10000',
      RASA_URL: 'https://4267-123-21-22-19.ngrok.io/webhooks/rest/webhook'
      //DIALOGFLOW_GOOGLE_CREDENTIALS_FILE: 'credentials/bot-ccall-9vhv-d7a8e5ad6d8c.json',
      
    }
  }]
};
