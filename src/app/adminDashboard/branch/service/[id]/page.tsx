import AdminService from "@/components/adminService";
import { db } from "@/lib/db";

export default async function AdminBranch({ params }: { params: { id: string } }) {
    const { id } = params;
    const branch = await db.branch.findUnique({
        where: {id :id},
        select : {
            services: {
                select: {
                    id: true,
                    serviceName: true,
                    duration: true,
                    branchId: true,
                    description: true,
                    typeId: true,
                    imgUrl: true,
                    price: true,
                    serviceType: {
                        select: {
                            id: true,
                            type: true
                        }
                    }
                }
            },
            name: true
        }
    })

    const fetchedServiceType = await db.serviceType.findMany();
    return (
        <div className="w-full flex items-center justify-center">
            <AdminService services={branch?.services} branchName={branch?.name} branchId={id} servicetypes={fetchedServiceType}/>
        </div>
    )
}