import StudentsInformation from "@/components/StudentsInformation";

export  interface IStudentsType {
    name: string,
    email:string, 
    _id : string, 
     age: number,
    department: string,
    address: string 
}

const StudentsPage = async() => {
    const res = await  fetch('http://localhost:5000/students');
    const students : IStudentsType[]= await res.json();
    console.log(students);

    return (
        <section>
            <h1> all student </h1>

            <div className="grid grid-cols-3 gap-4 ">
                {
                    students.map( student => <StudentsInformation key={student._id} student={student} />) 
                }

            </div>
            
            
        </section>
    );
};

export default StudentsPage;