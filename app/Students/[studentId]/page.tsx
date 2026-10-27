
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@base-ui/react';
import Link from 'next/link';
import React from 'react';

interface IParamsType {
    params : Promise<{studentId: string}>

}
const StudentDetailsPage = async ({params} : IParamsType) => {
    const {studentId} = await params ;

    const res = await fetch(`http://localhost:5000/students/${studentId}`);
    const data = await res.json() ;
    console.log(data);

    



    return (
        <div>
            <h2> hello bro </h2>
        
        <div>
             <Card className="relative mx-auto w-full max-w-sm pt-0">
           
            
            <CardHeader>
                <CardAction>
                {/* <Badge variant="secondary">Featured</Badge> */}
                </CardAction>
                <CardTitle> name : {data.name} </CardTitle>
                <CardDescription>
                    Email: {data.email}
                </CardDescription>
                <CardDescription>
                    department: {data.department}
                </CardDescription>
                <CardDescription>
                    age: {data.age}
                </CardDescription>
                <CardDescription>
                    address: {data.address}
                </CardDescription>
            </CardHeader>
            <CardFooter>
               
               <Link href={'/Students'}>
                      <Button className="w-full hover: cursor-pointer">View details</Button>
               </Link>
         
            </CardFooter>
            
            </Card>
                    
        </div>

            
        </div>
    );
};

export default StudentDetailsPage;