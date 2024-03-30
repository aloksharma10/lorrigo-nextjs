import ChangePasswordForm from '@/components/Settings/change-password-form'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import React from 'react'

const ChangePassword = () => {
  return (
    <div>
      <h1 style={{ 'fontSize': '25px' }} className='py-5 font-semibold'>Settings - Password</h1>
      <Card>
        <CardContent className='px-10 py-5'>
          <CardTitle className='py-4 font-semibold'>Change Password</CardTitle>
          <ChangePasswordForm />
        </CardContent>

      </Card>
    </div>
  )
}

export default ChangePassword