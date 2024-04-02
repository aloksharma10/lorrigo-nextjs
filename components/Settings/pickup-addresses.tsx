'use client'
import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ChevronLeft, ChevronRight, Circle, CircleCheck, Download, Plus, SearchIcon, SquarePen } from 'lucide-react';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableRow } from '../ui/table';
import * as Switch from '@radix-ui/react-switch';

const data = [
  {
    address_id: 1,
    name: 'John Doe',
    location: 122001,
    active: true
  },
  {
    address_id: 2,
    name: 'Fashion Streak Store',
    location: 122901,
    active: true
  },
  {
    address_id: 3,
    name: 'Richard',
    location: 122601,
    active: false
  }
]

const ActiveButton = () => {
  return (
    <div className='text-[#0A7900] bg-[#0a790045]  w-1/2 rounded-md text-center'>Active</div>
  )
}
const InactiveButton = () => {
  return (
    <div className='text-[#be0c34] bg-[#7900003a] w-1/2 rounded-md text-center'>Inactive</div>
  )
}

const AddressDetails = () => {
  return (
    <Table className='w-full'>
      <TableBody>
        {
          data.map((item) => {
            return <TableRow key={item.address_id} className='grid grid-cols-5'>
              <TableCell>{item.name}</TableCell>
              <TableCell><SquarePen className='text-[#747474] size-4' /></TableCell>
              <TableCell>{item.active ? <ActiveButton /> : <InactiveButton />}</TableCell>
              <TableCell>Location: {item.location}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <CircleCheck className='text-[#be0c34] mr-2' />
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label className="Label" htmlFor="primary-address" style={{ paddingRight: 15 }}>
                      Primary Address
                    </label>
                    <Switch.Root className="SwitchRoot" id="primary-address">
                      <Switch.Thumb className="SwitchThumb" />
                    </Switch.Root>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          })
        }
      </TableBody>
    </Table>
  )
}


const PickupAddresses = () => {
  const [page, setPage] = React.useState(1)
  const totalPages = 5
  function incrementPage(){
    setPage(prevPage => Math.min(prevPage + 1, totalPages));
  }
  function decrementPage(){
    setPage(prevPage => Math.max(prevPage - 1, 1));
  }
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
          <div className='flex border border-gray-300 rounded-md'>
            <SearchIcon className='mt-3 mx-2' size={15}/>
            <input type='text' placeholder='Search by Location name, City, State, Pincode' className='w-[480px] rounded-md focus-visible:ring-0 ' />
          </div>
        </div>
        <div className='flex gap-x-6'>
          <Button variant={'themeGrayBtn'} size={'icon'}><Download size={18} /></Button>
          <Button variant={'themeButton'} className='rounded-full'><Plus size={14} /> Add Pickup Address</Button>
        </div>
      </div>
      <AddressDetails />
      <div className='flex align-center'>
        <p className='grid place-content-center'>Show </p> 
        <Select>
          <SelectTrigger className='w-[70px] mx-4'>
            <SelectValue
              placeholder="15"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={'5'}>5</SelectItem>
            <SelectItem value={'10'}>10</SelectItem>
            <SelectItem value={'15'}>15</SelectItem>
          </SelectContent>
        </Select>
      <p className='grid place-content-center'> items per page</p>
      </div>

      <div className='flex gap-x-4 justify-center mt-6'>
        <button className='rounded-full p-1 bg-red-500' onClick={decrementPage}><ChevronLeft size={28} color='white' /></button>
        <p className='grid place-content-center'>{page} of {totalPages} pages</p>
        <button className='rounded-full p-1 bg-red-500' onClick={incrementPage}><ChevronRight size={28} color='white' /></button>
      </div>
      
    </div>
  )
}

export default PickupAddresses