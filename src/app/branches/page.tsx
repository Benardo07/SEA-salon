import BranchList from "@/components/branchList";
import { db } from "@/lib/db";

export default async function Branches() {
    const branches = await db.branch.findMany();

    return (
        <div className="w-full flex items-center justify-center">
            <BranchList branches={branches}/>
        </div>
    )
}