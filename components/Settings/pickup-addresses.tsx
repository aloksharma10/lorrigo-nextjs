'use client'
import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { ChevronLeft, CircleCheck, Download, Plus, SearchIcon, SquarePen, SwitchCamera, Upload } from 'lucide-react';
import { Button } from '../ui/button';

const data = {
  name: 'John Doe',
  location: 122001,
}

const AddressDetails = () => {
  return (
    <div className='flex items-center gap-x-4 justify-between'>
      <p className='font-semibold text-md'>{data.name}</p>
      <SquarePen />
      <p>Active</p>
      <p className='text-sm'>Location: <span className='font-semibold'>{data.location}</span></p>
      <div className='flex gap-x-2 text-md'><CircleCheck color='#C1392B'/> Primary Address </div>
    </div>
  )
}


const PickupAddresses = () => {
  return (
    <div>
      <div className='flex justify-between mb-10 mt-4'>
        <div className='flex'>
          <Select>
            <SelectTrigger className='w-[156px]'>
              <SelectValue
                placeholder="Phone Number"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={'phone'}>Phone Number</SelectItem>
              <SelectItem value={'location'}>Location</SelectItem>
              <SelectItem value={'city'}>City</SelectItem>
              <SelectItem value={'state'}>State</SelectItem>
              <SelectItem value={'pincode'}>Pincode</SelectItem>
            </SelectContent>
          </Select>
          <div className='flex border border-gray-300 rounded-r-md]'>
            <SearchIcon className='mt-1 ml-2' />
            <Input type='text' placeholder='Search by Location name, City, State, Pincode' className='w-[490px] border-0 focus-visible:ring-0 ' />
          </div>
        </div>
        <div className='flex gap-x-6'>
          {/* <Button variant={'themeGrayBtn'} size={'icon'}><Upload size={18} /></Button> */}
          <Button variant={'themeGrayBtn'} size={'icon'}><Download size={18} /></Button>
          <Button variant={'themeButton'} className='rounded-full'><Plus size={14}/> Add Pickup Address</Button>
        </div>
      </div>
      <AddressDetails />
    </div>
  )
}

export default PickupAddresses