import React from 'react'
import { Card, CardDescription, CardTitle } from '../ui/card'
import { Button } from '../ui/button'


const BusinessType = () => {
    return (
        <div>
            <div className='grid gap-6'>
                <Card className='px-10 py-4 flex hover:shadow-md hover:shadow-red-200'>
                    <input type="radio" id="individual" name="businessType" value="individual" className='mr-8 accent-red-600' />
                    <div>
                        <label htmlFor="individual"><CardTitle>Individual</CardTitle></label>
                        <CardDescription className='pt-3'>A Seller who is selling through online selling platforms, and has not registered his/her firm under Companies Act 2013</CardDescription>
                    </div>
                </Card>
                <Card className='px-10 py-4 flex hover:shadow-md hover:shadow-red-200'>
                    <input type="radio" id="solo" name="businessType" value="solo" className='mr-8 accent-red-600' />
                    <div>
                        <label htmlFor="individual"><CardTitle>Solo Propreitor</CardTitle></label>
                        <CardDescription className='pt-3'>Registered company as &apos;Solo Proprietor&apos; under Companies Act 2013</CardDescription>
                    </div>
                </Card>
                <Card className='px-10 py-4 flex hover:shadow-md hover:shadow-red-200'>
                    <input type="radio" id="company" name="businessType" value="company" className='mr-8 accent-red-600' />
                    <div>
                        <label htmlFor="individual"><CardTitle>Company</CardTitle></label>
                        <CardDescription className='pt-3'>CompanyRegistered company as &apos;LLP&apos;, &apos;Private&apos;, &apos;Subsidiary&apos;, &apos;Holding&apos;, etc. under Companies Act 2013</CardDescription>
                    </div>
                </Card>
            </div>
            <Button variant={'themeButton'} className='px-10 mt-6'>Next</Button>
        </div>
    )
}

const KycForm = () => {
    return (
        <div className='px-10 py-6'>
            <BusinessType />
        </div>
    )
}

export default KycForm