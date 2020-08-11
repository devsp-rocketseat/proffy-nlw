import { Request, Response } from 'express'

import db from "../database/connection"
import convertHourToMinutos from "../utils/convertHourToMinutes"

interface ScheduleItem {
    week_day: number
    from: string
    to: string
}

export default class ClassesController {
    async create(request: Request, response: Response) {

        const { name, avatar, whatsapp, bio, subject, cost, schedule } = request.body

        const trx = await db.transaction()

        try {

            // ---------- users ----------
            const insertedUsersIds = await trx('users').insert({ name, avatar, whatsapp, bio })

            const user_id = insertedUsersIds[0]

            // ---------- classes ----------
            const insertedClassesIds = await trx('classes').insert({ subject, cost, user_id })

            const class_id = insertedClassesIds[0]

            // ---------- classes ----------
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => ({
                class_id,
                week_day: scheduleItem.week_day,
                from: convertHourToMinutos(scheduleItem.from),
                to: convertHourToMinutos(scheduleItem.to)
            }))

            await trx('class_schedule').insert(classSchedule)

            await trx.commit()

            return response.status(201).send()

        } catch (error) {

            await trx.rollback()

            return response.status(400).json({
                error: 'Erro inesperado ao criar a classe.II'
            })
        }
    }
}
