import PickupAddresses from '@/components/Settings/pickup-addresses'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'

// const Pagination = ({ totalPages, onPageChange, itemsPerPageOptions }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);

//   useEffect(() => {
//     onPageChange(currentPage, itemsPerPage);
//   }, [currentPage, itemsPerPage]);

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const handleItemsPerPageChange = (e) => {
//     setItemsPerPage(parseInt(e.target.value));
//     setCurrentPage(1); // Reset to first page when changing items per page
//   };
//   return (
//     <div>
//       <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
//         {itemsPerPageOptions.map((option) => (
//           <option key={option} value={option}>
//             {option} per page
//           </option>
//         ))}
//       </select>
//       <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
//       <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
//       <p>Page {currentPage} of {totalPages}</p>
//     </div>
//   );
// };


const ManagePickupAddresses = () => {
  return (
    <div>
      <h1 className='py-5 text-2xl font-semibold'>Settings - Manage Pickup Addresses</h1>
      <Card>
        <CardContent className='px-10 py-5'>
          <PickupAddresses />
        </CardContent>
      </Card>
      <div>
        <Select>
          <SelectTrigger className='w-[156px]'>
            <SelectValue
              placeholder="Phone Number"
            />
          </SelectTrigger>
          {/* <SelectContent>
            <SelectItem value={'phone'}>Phone Number</SelectItem>
            <SelectItem value={'location'}>Location</SelectItem>
            <SelectItem value={'city'}>City</SelectItem>
            <SelectItem value={'state'}>State</SelectItem>
            <SelectItem value={'pincode'}>Pincode</SelectItem>
          </SelectContent> */}
        </Select>
      </div>
      <div className='flex gap-x-4 justify-center mt-6'>
        <button className='rounded-full p-1 bg-red-500'><ChevronLeft size={28} color='white' /></button>
        <p className='grid place-content-center'>1 of 15 Pages</p>
        <button className='rounded-full p-1 bg-red-500'><ChevronRight size={28} color='white' /></button>
      </div>
    </div>
  )
}

export default ManagePickupAddresses