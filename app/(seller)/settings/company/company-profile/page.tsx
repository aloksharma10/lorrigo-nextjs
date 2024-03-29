import { Card, CardContent, CardTitle } from '@/components/ui/card'
import React from 'react'

const CompanyProfile = () => {
  return (
    <div>
      <h1 style={{ 'fontSize': '25px' }} className='py-5 font-medium'>Settings - Company Profile</h1>
      <Card>
        <CardContent>
          <CardTitle className='py-4 font-semibold'>Company Details</CardTitle>
          <hr />
          <form>
            <div className='grid grid-column-2 py-3'>
              <div className='grid h-14'>
                <label className='font-semibold'>Company ID <span className='text-red-700'>*</span></label>
                <input type='text' className='shadow-md border h-10 my-2' />
              </div>
              <div className='grid h-14'>
                <label className='font-semibold'>Company ID <span className='text-red-700'>*</span></label>
                <input type='text' className='shadow-md border h-10 my-2' />
              </div>
            </div>
          </form>
        </CardContent>

      </Card>
    </div>
  )
}

export default CompanyProfile