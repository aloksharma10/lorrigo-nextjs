import { DataAnalysis } from "@/components/Dashboard/data-analysis"
import { Overview } from "@/components/Dashboard/overview"
import { axiosIWAuth } from "@/lib/axiosConfig"


export default async function DashboardPage() {
  // try {
  //   const res = await axiosIWAuth.get('/shipment/dashboard')
  //   console.log(res.data)
  // } catch (error) {
  //   console.log(error)
  // }
  return (
    <div className="space-y-5">
      <Overview />
      <DataAnalysis/>
    </div>
  )
}