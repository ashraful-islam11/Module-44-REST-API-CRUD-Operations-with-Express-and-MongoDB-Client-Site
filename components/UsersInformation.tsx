"use client"
import IUserType from "@/app/IType";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import UpdateUserDialog from "./UpdateUserDailog";



const UsersInformation = ({user} : {user:IUserType}) => {
    const {_id} :{_id: string} = user ; 
    

    const router = useRouter() ;

     const handleDeleteUser = async ()=> {
            console.log('dleate hoye geche ',_id);
        const res = await fetch(`http://localhost:5000/users/${_id}`, {
            method: 'DELETE'
        })
        const afterDelete =await res.json() ;
        console.log(afterDelete);

        if(afterDelete.deletedCount > 0) {
            toast.success('user delete successful ! ') ; 
            router.refresh()
            
        }

     }

    return (
        <div>

             <Card className="relative mx-auto w-full max-w-sm pt-0">
           
            
            <CardHeader>
                <CardAction>
                {/* <Badge variant="secondary">Featured</Badge> */}
                </CardAction>
                <CardTitle> name : {user.name} </CardTitle>
                <CardDescription>
                    Email: {user.email}
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <Link href={`/Users/${user._id}`}> 
                <Button className="w-full hover: cursor-pointer">View details</Button>
                </Link>
                <UpdateUserDialog user ={user} ></UpdateUserDialog>
                <Button variant='destructive' onClick={()=>handleDeleteUser(_id)} >Delete</Button>
            </CardFooter>
            
            </Card>
                    
                    
         </div>
        
    );
};

export default UsersInformation;