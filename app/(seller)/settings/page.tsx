import { Card, CardContent } from '@/components/ui/card'
import React from 'react'
import Link from 'next/link'
const Settings = () => {
  return (
    <div>
      <h1 style={{'fontSize': '25px'}} className='py-5'>Settings</h1>
      <div className='grid grid-cols-3 gap-14'>
        <Card className="drop-shadow-md p-1 rounded-2xl">
          <CardContent className='pt-5 h-187 w-313'>
            <div className='flex'>
              <div className="mr-3">
                <img src='assets/clarity_building-line.png' />
              </div>
              <div className='grid place-content-center'><h3 className="font-medium text-lg">Company</h3></div>
            </div>
            <div className="grid mx-12 gap-1 my-3">
              <Link href='/settings/company/company-profile'><div className='flex justify-between' style={{'fontSize': '14px'}}>Company Profile <img src='assets/arrow.png' style={{'height': '15px'}}/></div></Link>
              <Link href='/settings/company/kyc'><div className='flex justify-between' style={{'fontSize': '14px'}}><p>KYC</p> <img src='assets/arrow.png' style={{'height': '15px'}}/></div></Link>
              <Link href='/settings/company/change-password'><div className='flex justify-between' style={{'fontSize': '14px'}}><p>Change Password</p> <img src='assets/arrow.png' style={{'height': '15px'}}/></div></Link>
            </div>
          </CardContent>
        </Card>
        <Card className="drop-shadow-md p-1 rounded-2xl">
          <CardContent className='pt-5 h-187'>
            <div className='flex'>
              <div className="mr-3">
                <img src='assets/clarity_building-line.png' />
              </div>
              <div className='grid place-content-center'><h3 className="font-medium text-lg">COD Payments</h3></div>
            </div>
            <div className="grid mx-12 gap-1 my-3">
              <Link href='/settings/cod-payments/bank-details'><div className='flex justify-between' style={{'fontSize': '14px'}}><p>Bank Details</p> <img src='assets/arrow.png' style={{'height': '15px'}}/></div></Link>
              <Link href='/settings/cod-payments/postpaid'><div className='flex justify-between' style={{'fontSize': '14px'}}><p>Postpaid</p> <img src='assets/arrow.png' style={{'height': '15px'}}/></div></Link>      
            </div>
          </CardContent>
        </Card>
        <Card className="drop-shadow-md p-1 rounded-2xl">
          <CardContent className='pt-5 h-187'>
            <div className='flex'>
              <div className="mr-3">
                <img src='assets/clarity_building-line.png' />
              </div>
              <div className='grid place-content-center'><h3 className="font-medium text-lg">Billing</h3></div>
            </div>
            <div className="grid mx-12 gap-1 my-3">
              <Link href='/settings/billing/gstin-invoicing'><div className='flex justify-between' style={{'fontSize': '14px'}}><p>GSTIN Invoicing</p> <img src='assets/arrow.png' style={{'height': '15px'}}/></div></Link>
              <Link href='/settings/billing/billing-addresses'><div className='flex justify-between' style={{'fontSize': '14px'}}><p>Billing Address</p> <img src='assets/arrow.png' style={{'height': '15px'}}/></div></Link>
            </div>
          </CardContent>
        </Card>
        <Card className="drop-shadow-md p-1 rounded-2xl">
          <CardContent className='pt-5 h-187' style={{'height': '187px'}}>
            <div className='flex'>
              <div className="mr-3">
                <img src='assets/clarity_building-line.png' />
              </div>
              <div className='grid place-content-center'><h3 className="font-medium text-lg">Pickup Address</h3></div>
            </div>
            <div className="grid mx-12 gap-1 my-3">
            <Link href='/settings/pickup-address/manage-pickup-addresses'><div className='flex justify-between' style={{'fontSize': '14px'}}><p>Manage pickup addresses</p> <img src='assets/arrow.png' style={{'height': '15px'}}/></div></Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Settings