import BranchList from "@/components/branch/branchList";
import { db } from "@/lib/db";

export const dynamic = 'force-dynamic'
export default async function Branches() {
    const branches = await db.branch.findMany();

    return (
        <div className="w-full flex items-center justify-center">
            <BranchList branches={branches}/>
        </div>
    )
}