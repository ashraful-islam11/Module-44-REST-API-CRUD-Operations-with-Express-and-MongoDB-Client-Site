'use client'
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { redirect } from "next/navigation";
import { toast } from "sonner";

const CreateUserPage = () => {
   const handleCreateNewUser = async (e : React.SubmitEvent<HTMLElement>) => {
        e.preventDefault() 

        const formData =  new FormData(e.target) 
        const userData = Object.fromEntries(formData.entries()) 
        console.log(userData);

        const response = await fetch('http://localhost:5000/users', {
            method : 'POST', 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })

        console.log('after submit client to server', response);

        const afterSubmit = await  response.json() ;
        console.log(afterSubmit);

        if(afterSubmit.insertedId){
            console.log('user added successfully!');
            toast.success('successfully added new user',{
                unstyled: true, 
                position: 'top-center', 
                classNames: {
                 toast: "bg-transparent border-2 border-green-500 p-4 rounded-lg shadow-lg flex items-center gap-2",
                  title: "bg-gradient-to-r from-green-500 to-pink-500 bg-clip-text text-transparent font-bold text-lg",  
                },

            })
            redirect('/Users')
        }
     

    } 

    return (
       <section  >
            <form  className="max-w-87.5 mx-auto border-2 border-[#5e5e77] p-5 rounded-3xl mt-5 " onSubmit={handleCreateNewUser}>
                <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="fieldgroup-name  ">Name</FieldLabel>
                    <Input id="fieldgroup-name" name='name' placeholder="Jordan Lee" />
                </Field>
                <Field>
                    <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
                    <Input
                    id="fieldgroup-email"
                    type="email"
                    name='email'
                    placeholder="name@example.com"
                    />
                    <FieldDescription>
                    We&apos;ll send updates to this address.
                    </FieldDescription>
                </Field>
                <Field orientation="horizontal">
                    <Button type="reset" variant="outline">
                    Reset
                    </Button>
                    <Button type="submit">addUser</Button>
                </Field>
                </FieldGroup>
            </form>
       </section>
    );
};

export default CreateUserPage;