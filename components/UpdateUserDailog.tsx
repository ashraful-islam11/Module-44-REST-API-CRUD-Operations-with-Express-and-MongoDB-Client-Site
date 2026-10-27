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



const UpdateUserDialog = ({user} : {user: IUserType}) => {
    const router = useRouter();

    const handleEditUsers = async (e :React.SubmitEvent<HTMLFormElement> ) => {
        e.preventDefault() ;
  
        const formData = new FormData(e.currentTarget) ;
        const updateData = Object.fromEntries(formData.entries());
    

       const response = await fetch(`http://localhost:5000/users/${user._id}`,{
          method: 'PATCH',
          headers:{
            "Content-Type" : "application/json"
          },

          body: JSON.stringify(updateData)
       })

       const result = await response.json() ;

       console.log(' কিরে ভাই কি হইলো', result);

       if(result.modifiedCount){
        toast.success('user update successful !')
         router.refresh()
       }
        

    }
    return (
        <Dialog>
      
        <DialogTrigger render={<Button variant="outline" className="mx-4 ">Edit</Button>} />
        <DialogContent className="sm:max-w-sm">
            <form onSubmit={handleEditUsers} >
          <DialogHeader>
            <DialogTitle>Edit Users</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue={user.name} />
            </Field>
            <Field>
              <Label htmlFor="email-1">Email</Label>
              <Input id="email-1" name="email" defaultValue={user.email} />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <DialogClose render={<Button type="submit">Edit User</Button>} />
          
          </DialogFooter>
      </form>
        </DialogContent>
    </Dialog>
    );
};

export default UpdateUserDialog;