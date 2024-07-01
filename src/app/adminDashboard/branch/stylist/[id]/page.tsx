import AdminService from "@/components/adminService";
import AdminStylist from "@/components/adminStylist";
import { db } from "@/lib/db";

export default async function AdminBranchStylist({ params }: { params: { id: string } }) {
    const { id } = params;
    const branch = await db.branch.findUnique({
        where: {id :id},
        select : {
            stylists: {
                select: {
                  id: true,
                  name: true,
                  branchId: true,
                  imgUrl: true,
                  gender: true,
                  
                }
            },
            name: true
        }
    })

    const fetchedServiceType = await db.serviceType.findMany();
    return (
        <div className="w-full flex items-center justify-center">
            <AdminStylist stylists={branch?.stylists} branchId={id} branchname={branch?.name}/>
        </div>
    )
}