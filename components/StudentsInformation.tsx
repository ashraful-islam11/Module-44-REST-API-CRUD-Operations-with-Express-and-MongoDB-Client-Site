"use client"

import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle, } from "./ui/card";
import Link from "next/link";
import { IStudentsType } from "@/app/Students/page";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import UpdateStudentsDailog from "./UpdateStudentsDailog";
// import { Button } from "@base-ui/react";


const StudentsInformation = ( {student} : {student: IStudentsType}) => {
    const {_id} = student ;
    const router = useRouter()
  const handleDeleteStudent = async ()=> {

         console.log('kire vai ki khobor', _id);
         const res = await fetch(`http://localhost:5000/students/${_id}`, {
            method: 'DELETE'
         }) 

         const afterDelete = await res.json() ;
         console.log(afterDelete);

        if(afterDelete.deletedCount > 0){
            toast.success('successfully deleted student'); 
            router.refresh() 

        }

  }

    return (
         <section>
                <Card className="relative mx-auto w-full max-w-sm pt-0">
           
            
            <CardHeader>
                <CardAction>
                {/* <Badge variant="secondary">Featured</Badge> */}
                </CardAction>
                <CardTitle> name : {student.name} </CardTitle>
                <CardDescription>
                    Email: {student.email}
                </CardDescription>
            </CardHeader>
            <CardFooter className="mx-3 ">
                <Link href={`/Students/${student._id}`}> 
                <Button className=" cursor-pointer">View details</Button>
                </Link>

                 <UpdateStudentsDailog student={student}></UpdateStudentsDailog>
                <Button variant='destructive' onClick={()=>handleDeleteStudent(_id)}>Delete</Button>
            </CardFooter>
            
            </Card>
                    
         </section>
    );
};

export default StudentsInformation;