import { CronJob } from 'cron'
import https from 'https'
import emailjs from '@emailjs/browser'
import env from '#src/config/environment.js'

export const job = new CronJob('*/10 * * * *', () => {
  https
    .get(env.SERVER_URL, (res) => {
      if (res.statusCode === 200) {
        emailjs.send(env.EMAILJS_SERVICE_ID, env.EMAILJS_TEMPLATE_ID, {
          status: res.statusCode,
          message: 'Connected to server (not ok)'
        })
      } else {
        console.error("Failed to connect to server (it's ok) with status code:", res.statusCode)
      }
    })
    .on('error', (err) => {
      console.error(err.message)
    })
})
