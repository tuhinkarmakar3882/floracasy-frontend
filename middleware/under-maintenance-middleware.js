'use strict'
import { underMaintenance } from '~/environmentVariables'

export default async function ({ redirect }) {
  if (underMaintenance) return redirect('/ServiceUnderMaintenance')
}
