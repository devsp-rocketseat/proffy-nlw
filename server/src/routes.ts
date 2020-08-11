import express, { response } from 'express'
import db from './database/connection'
import convertHourToMinutos from './utils/convertHourToMinutes'

const routes = express.Router()

interface ScheduleItem {
    week_day: number
    from: string
    to: string
}

routes.post('/classes', async (request, response) => {

    const { name, avatar, whatsapp, bio, subject, cost, schedule } = request.body

    // ---------- users ----------
    const insertedUsersIds = await db('users').insert({ name, avatar, whatsapp, bio })

    const user_id = insertedUsersIds[0]

    // ---------- classes ----------
    const insertedClassesIds = await db('classes').insert({ subject, cost, user_id })

    const class_id = insertedClassesIds[0]

    // ---------- classes ----------
    const classSchedule = schedule.map((scheduleItem: ScheduleItem) => ({
        class_id,
        week_day: scheduleItem.week_day,
        from: convertHourToMinutos(scheduleItem.from),
        to: convertHourToMinutos(scheduleItem.to)
    }))

    await db('class_schedule').insert(classSchedule)

    return response.json({ ok: true })
})


export default routes
