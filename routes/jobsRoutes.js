import express from 'express'
const router = express.Router()
import testUser from '../middleware/testUser.js'

import { createJob, deleteJob, getAllJobs, updateJob, showStats } from '../controllers/jobsController.js'

router.route('/').get(getAllJobs).post(testUser, createJob)

router.route('/showStats').get(showStats)

router.route('/:id').delete(testUser, deleteJob).patch(testUser, updateJob)

export default router