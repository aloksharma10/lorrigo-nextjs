import { CompanyProfileForm } from '@/components/Settings/company-profile-form'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import React from 'react'

const CompanyProfile = () => {
  return (
    <div>
      <h1 style={{ 'fontSize': '25px' }} className='py-5 font-semibold'>Settings - Company Profile</h1>
      <Card>
        <CardContent className='px-10 py-5'>
          <CardTitle className='py-4 font-semibold'>Company Details</CardTitle>
          <hr />
          <CompanyProfileForm />
        </CardContent>
      </Card>
    </div>
  )
}

export default CompanyProfile