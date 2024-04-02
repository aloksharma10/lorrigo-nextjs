import GstinForm from '@/components/Settings/gstin-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import React from 'react'
const GstinInvoicing = () => {
  return (
    <div className='mb-8'>
      <h1 className='py-5 text-2xl font-semibold'>Settings - Bank Details</h1>  

      <Card>
        <CardContent className='px-10 py-5'>
          <CardTitle className='py-4 font-semibold'>GSTIN Invoicing</CardTitle>
          <GstinForm />
          <div className='w-1/2'>
            <div className='flex justify-between font-semibold'><h3>Enable State GST Invoicing</h3><Button variant={'themeButton'} className='rounded-full h-[25px]'>+ Add State</Button></div>
            <CardDescription>
              Want to enable state GST?
              <ul className='list-disc mx-4'>
                <li>When you have multiple GSTINs from different state.</li>
                <li>When you want to generate separate freight invoices for each pickup address.</li>
                <li>When you want to calm input credit on tax paid by you on your purchase.</li>
              </ul>
            </CardDescription>
          </div>
          <p className='my-6'>Note: Customer&apos;s Invoices will be generated with pickup address</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default GstinInvoicing