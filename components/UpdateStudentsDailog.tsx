"use client"
import IUserType from "@/app/IType"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { toast } from "sonner"


const UpdateStudentsDailog = ({student} : {student: IUserType}) => {
    const router = useRouter()
    const handleUpdateStudents = async (e : React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        const formData = new FormData(e.currentTarget) ;
        const studentsData = Object.fromEntries(formData.entries());
        console.log(studentsData);


        const response = await fetch(`http://localhost:5000/students/${student._id}`, {
            method: 'PATCH',
            headers:{
                "Content-Type" : "application/json"
            },

            body: JSON.stringify(studentsData) 
        })

        const result = await response.json()
        console.log('response of server', result);

       if(result.modifiedCount){
          toast.success('successful students update');
          router.refresh()
          
       }
    }
    return (
        <Dialog>

        <DialogTrigger render={<Button variant="outline" className='mx-2 '>Edit</Button>} />
        <DialogContent className="sm:max-w-sm">
            <form onSubmit={handleUpdateStudents}>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue={student.name} />
            </Field>
            <Field>
              <Label htmlFor="email-1">Email</Label>
              <Input id="email-1" name="email" defaultValue={student.email} />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <DialogClose render={<Button type="submit">update student</Button>} />
            
          </DialogFooter>
          </form>
        </DialogContent>
    
    </Dialog>
    );
};

export default UpdateStudentsDailog;